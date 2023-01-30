//인증시간 카운트 다운
let intervalId = null;
const startCountDown = () => {
  let time = 60;
  const limitTime = document.getElementById("LimitTime");
  () => {
    if (time === 0) {
      limitTime.innerHTML = "시간초과";
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      limitTime.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      time--;
    }
  };
  intervalId = setInterval(() => {
    if (time === 0) {
      clearInterval(intervalId);
      limitTime.innerHTML = "시간초과";
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      limitTime.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      time--;
    }
  }, 1000);
};

const onComplete = () => {
  clearInterval(intervalId);
  console.log("인증성공");
};

// 휴대폰 인증 토큰 전송하기

const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";

  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const PhoneNumber = PhoneNumber01.concat(PhoneNumber02, PhoneNumber03);

  await axios
    .post("http://localhost:3000/tokens/phone", {
      phone: PhoneNumber,
    })
    .then((res) => {
      console.log(res);
    });
  console.log("인증 번호 전송");
};

//토큰 인증 완료하기
const submitToken = async () => {
  console.log("클릭");
  const token = document.getElementById("TokenInput").value;

  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const phone = PhoneNumber01.concat(PhoneNumber02, PhoneNumber03);

  await axios
    .patch("http://localhost:3000/tokens/phone", {
      token: token,
      phone: phone,
    })
    .then((res) => {
      if (res.status === 200) {
        // 인증 완료 후 호출
        onComplete();
      } else {
        alert(res.data.error);
      }
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원가입을 시도합니다.");
  //1.이름
  const name = document.getElementById("SignupName").value;

  //2.주민등록번호
  const birthday = document.getElementById("SignupPersonal").value;
  const dash = "-";
  const backSsn = document.getElementById("Backssn").value;
  const personal = birthday.concat(dash, backSsn);

  //3.좋아하는 사이트
  const prefer = document.getElementById("SignupPrefer").value;

  //4.핸드폰 번호
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const phone = PhoneNumber01.concat(PhoneNumber02, PhoneNumber03);

  //5.비밀번호
  const pwd = document.getElementById("SignupPwd").value;

  //6.email
  const email = document.getElementById("SignupEmail").value;

  await axios
    .post("http://localhost:3000/users", {
      name,
      personal,
      prefer,
      phone,
      pwd,
      email,
    })
    .then((res) => {
      const message = res.data.message;
      const id = res.data.id;
      // do something with message and id
      console.log(message, id);
      alert("가입완료");

      window.location.href =
        "http://127.0.0.1:5500/mini-project/frontend/login/index.html";
    });

  console.log("회원 가입 이메일 전송");
};
