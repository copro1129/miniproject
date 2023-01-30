import { getToday } from "./utils.js";
import { customRegistrationNumber } from "./ssnChange.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러발생 메일을 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({
  name,
  email,
  personal,
  prefer,
  pwd,
  phone,
}) {
  const result = `
      <html>
         <body>
           <h1>${name}님 가입을 환영합니다.!!!</h1>
           <hr/>
           <div>이름: ${name}</div>
           <div>이메일: ${email}</div>
           <div>주민번호: ${customRegistrationNumber(personal)}</div>
           <div>선호하는 사이트: ${prefer}</div>
           <div>비밀번호: ${pwd}</div>
           <div>전화번호: ${phone}</div>
           <div>가입일: ${getToday()}</div>
         </body>
      </html>
      `;
  console.log(result);
  return result;
}

export async function sendWelcomeTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "email전송 API를 시험중입니다..",
    html: mytemplate,
  });
}
