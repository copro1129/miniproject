import puppeteer from "puppeteer";
import mongoose from "mongoose";
import request from "request";
import fs from "fs";
import { Starbucks } from "./models/starbucks.model.js";
//몽고 DB접속!!
mongoose.connect("mongodb://localhost:27017/mini-project");

async function startCrawling() {
  //1. brower를 보일지 말지
  const browser = await puppeteer.launch({ headless: false });
  //2. 페이지를 만든다.
  const page = await browser.newPage();
  //3. 페이지의 크기를 정한다.
  await page.setViewport({ width: 1920, height: 1080 });
  //4. 크롤링 하고 싶은 페이지
  await Promise.all([
    page.goto("https://www.starbucks.co.kr/menu/drink_list.do"),
    page.waitForNavigation(),
  ]);

  //메뉴명
  let target = "//li[@class='menuDataSet']";
  await page.waitForXPath(target);
  let arr = await page.$x(target);
  console.log(arr);

  //메뉴와 이미지 확인
  for (let i = 0; i < arr.length; i++) {
    let menuName = await arr[i].$eval("dd", (el) => el.textContent);
    let menuImage = await arr[i].$eval("img", (el) => el.getAttribute("src"));
    console.log(`메뉴명: ${menuName}`);
    console.log(`이미지: ${menuImage}`);

    //이미지 URL로부터 이미지 다운로드
    if (!fs.existsSync("img_crawling")) {
      fs.mkdirSync("img_crawling");
    }
    let fileName = `img_crawling/${menuName}.jpg`;
    request(menuImage).pipe(fs.createWriteStream(fileName));
    console.log(`이미지 ${fileName} 저장 완료`);

    //메뉴와 이미지를 저장
    const starbucks = new Starbucks({
      name: menuName,
      img: menuImage,
    });
    await starbucks.save();
  }

  //30초간 기다린 다음 브라우저 닫기
  setTimeout(async () => {
    await browser.close();
  }, 7000);
}

//크롤링 시작
startCrawling();
