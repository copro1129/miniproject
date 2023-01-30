import axios from "axios";
import cheerio from "cheerio";

export async function scraping(site) {
  //1.입력된 컨텐츠에서 http로 시작하는 글자가 있는지 찾기

  // const urlArr = myuser.prefer.filter((el) => el.includes("http"));
  // console.log(urlArr);

  const myurl = site.startsWith("http") ? site : "https://" + site;

  // console.log(myurl);

  //2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html코드 받아오기 => 스크래핑
  const result = await axios.get(myurl);
  // console.log(result.data);

  //3. 스크래핑 결과에서 OG(오픈 그래프) 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);

  //html문서에서 meta로 시작되는 태그(들)를 모두 찾는다.
  //each(cheerio의 반복문) : (index, element) index:번째  element : meta태그
  //each가 반복문이므로 () => { }가 여러번 실행된다.
  //meta태그가 속성으로 "property"를 가지고 있으면,
  //meta태그가 속성으로 가지고 있는 property를
  // : 기준으로 쪼갠후 [og, title] 1번째 인덱스의 요소인 title을 key에 담는다.
  const keyValueObject = {};
  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      keyValueObject[key] = value;
    }
  });
  const { url, type, ...need } = keyValueObject;
  // console.log(need);
  return need;
}
