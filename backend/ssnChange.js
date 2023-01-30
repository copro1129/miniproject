export function customRegistrationNumber(ssn) {
  //1.주민번호에 -가 포함되어있는지 확인
  if (!ssn.includes("-")) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return;
    //2.주민번호의 자릿수가 -를 기준으로 앞자리 6자리인지 뒷자리 7자리인지 확인
  } else if (
    ssn.substring(0, 6).length !== 6 ||
    ssn.substring(7).length !== 7
  ) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return;
    //3.주민번호를 *표시로 전환하여 콘솔에 출력
  } else {
    const ssnArr = ssn.split("-");
    let frontSsn = ssnArr[0];
    let backSsn = ssnArr[1];
    // const validSsn = frontSsn + "-" + backSsn[0] + "******";
    const validSsn = frontSsn + "-" + "*******";
    return validSsn;
  }
}
