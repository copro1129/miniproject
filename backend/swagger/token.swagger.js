// token.swagger.js

/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 전송
 *     tags: [Auth]
 *     requestBody:
 *        content:
 *           application/json:
 *              schema:
 *                    properties:
 *                          phone:
 *                              type: String
 *                              example:  01012345678
 *     responses:
 *          200:
 *              description: 성공
 *
 */

/**
 * @swagger
 * /tokens/phone:
 *    patch:
 *     summary: 토큰 인증 요청
 *     tags: [Auth]
 *     requestBody:
 *        content:
 *           application/json:
 *              schema:
 *                    properties:
 *                          certificated_number:
 *                              type: String
 *                              example: 454545
 *     responses:
 *          200:
 *              description: 성공
 */
