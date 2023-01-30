// const express = require("express");
import { customRegistrationNumber } from "./ssnChange.js";
import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendWelcomeTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import { scraping } from "./cheerio.js";

const app = express();
app.use(cors()); //모든 사이트에서 허용
app.use(express.json());

//설정3-연구X
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

//몽고DB접속
mongoose.connect("mongodb://my-database:27017/mini-project");

//1.회원가입 API
app.post("/users", async (req, res) => {
  const myphone = req.body.phone;
  const existingToken = await Token.findOne({ phone_number: myphone });
  if (!existingToken || existingToken.isAuth === false) {
    res.status(422).send("에러 핸드폰 번호가 인증되지 않았습니다.");
    return;
  }

  if (existingToken && existingToken.isAuth === true) {
    const myuser = req.body;
    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(myuser.email);
    if (isValid) {
      // 2. 가입환영 템플릿 만들기
      const template = getWelcomeTemplate(myuser);

      // 3. 이메일에 가입환영 템플릿 전송하기
      sendWelcomeTemplateToEmail(myuser.email, template);

      const personal_origin = req.body.personal;
      const personal_encoding = customRegistrationNumber(personal_origin);
      const og = await scraping(myuser.prefer);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        personal: personal_encoding,
        prefer: req.body.prefer ? req.body.prefer : null,
        pwd: req.body.pwd,
        phone: req.body.phone,
        og: { title: og.title, description: og.description, image: og.image },
      });
      const newUser = await user.save();
      res.send({ message: "가입완료되었습니다.", id: newUser._id });
    }
  }
});

//2.회원목록 조회 API
app.get("/users", async (req, res) => {
  const result = await User.find();
  //2. 꺼내온 결과를 응답으로 주기
  res.send(result);
});

//3. 휴대폰 토큰 인증
app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  console.log(myphone);
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();
    //2-1) "몽고 DB에 접속"해서 해당 번호가 이미 존재한다면, 최신 토큰으로 덮어씌운다.

    //만약에 해당 번호가 이미 존재한다면 DB에 토큰을 update해서 저장
    const existingToken = await Token.findOne({ phone_number: myphone });
    console.log(existingToken);
    if (existingToken) {
      existingToken.token = mytoken;
      await existingToken.save();
    } else {
      const newToken = new Token({
        token: mytoken,
        phone_number: myphone,
        isAuth: false,
      });
      await newToken.save();
    }

    // 3) 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send(`${myphone}로 인증 문자가 전송되었습니다.`);
  }
});

//4. 토큰 인증 완료하기
app.patch("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  const token = req.body.token;

  // 핸드폰 번호로 토큰 문서를 찾음
  const existingToken = await Token.findOne({ phone_number: myphone });

  // 핸드폰 번호가 저장되어 있지 않다면 false 응답
  if (!existingToken) {
    res.send("false");
    return;
  }

  // 해당 핸드폰 번호에 함께 저장된 토큰이, 입력받은 토큰과 일치하지 않는다면 false 응답
  if (existingToken.token !== token) {
    res.send("false");
    return;
  }

  // 토큰이 일치하면 isAuth 값을 true로 변경하고 DB에 저장
  existingToken.isAuth = true;
  await existingToken.save();

  // 저장 성공시 true 응답
  console.log("인증에 성공하였습니다.");
  res.send("인증성공");
});

//5.커피 목록조회
app.get("/starbucks", async (req, res) => {
  const result = await Starbucks.find();
  //2. 꺼내온 결과를 응답으로 주기
  res.send(result);
});

//Backend API 서버 오픈!!
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});

//listen : 클라이언트로부터 요청을 기다린다. + 계속대기상태
