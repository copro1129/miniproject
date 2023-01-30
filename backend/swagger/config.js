//중간 설정1
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나만의 미니 프로젝트 API명세서",
      version: "1.0.0",
    },
  },
  //API Docs를 별도 파일로 작성
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
