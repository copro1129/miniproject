// user.swagger.js

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원가입
 *     tags: [User]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: 김자바
 *                  email:
 *                    type: string
 *                    example: abc@naver.com
 *                  personal:
 *                    type: string
 *                    example: 220101-1111111
 *                  prefer:
 *                    type: string
 *                    example: https://naver.com
 *                  pwd:
 *                    type: string
 *                    example: 1234
 *                  phone:
 *                    type: string
 *                    example: 01012345678
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "회원가입완료"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 조회하기
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   og:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: 네이버
 *                       description:
 *                         type: string
 *                         example: 네이버 메인에서 다양한 정보를 만나보세요
 *                       image:
 *                         type: string
 *                         example: http://s.pstatic.net/static/www/mobile/edit/...
 *                   _id:
 *                     type: string
 *                     example: 61e62e84b
 *                   name:
 *                     type: string
 *                     example: 물자바
 *                   email:
 *                     type: string
 *                     example: waterjava@naver.com
 *                   personal:
 *                     type: string
 *                     example: 991114-******
 *                   prefer:
 *                     type: string
 *                     example: https://www.naver.com
 *                   pwd:
 *                     type: string
 *                     example: 1234
 *                   phone:
 *                     type: string
 *                     example: 01012345678
 *                   __v:
 *                     type: integer
 *                     example: 0
 */
