// 커피 목록 조회 API를 요청해주세요.
let result;
const getCoffee = () => {
  console.log("index.js 파일의 openMenu 함수 안에서 getCoffee가 실행 됨");
  // 1. 백엔드 서버로 /starbucks API 요청해 커피 데이터를 받는다.
  axios.get("http://localhost:3000/starbucks").then((res) => {
    console.log(res.data);
    result = res.data;
    // 2. 받은 데이터로 createMenuCard 함수를 이용해 메뉴 카드를 모두 만들어주세요.
    for (let i = 0; i < result.length; i++) {
      createMenuCard(result[i]);
    }
  });
};

const createMenuCard = async (menu) => {
  const menuCardWrapper = document.createElement("div");
  menuCardWrapper.className = "Menu_Card_Wrapper";

  const menuCardImgBox = document.createElement("div");
  menuCardImgBox.className = "Menu_Card_ImgBox";

  // 이미지를 인코딩하여 이미지 태그로 추가
  const img = document.createElement("img");
  img.src = `data:image/jpeg;base64,${menu.img.data}`; // 3. 몽고DB에서 가져온 이미지 주소를 이미지 태그의 src 속성에 넣어준다.
  // 4. 이미지 태그를 menuCardImgBox 엘리먼트에 추가
  menuCardImgBox.appendChild(img);

  const menuCardName = document.createElement("div");
  menuCardName.className = "Menu_Card_Name";
  menuCardName.textContent = menu?.name || "메뉴이름";

  const menuCardInfo = document.createElement("div");
  menuCardInfo.className = "Menu_Card_Info";

  const menuWrapper = document.querySelector("#Menu_Background");

  menuCardWrapper.appendChild(menuCardImgBox);
  menuCardWrapper.appendChild(menuCardName);
  menuCardWrapper.appendChild(menuCardInfo);
  menuWrapper.appendChild(menuCardWrapper);
};
