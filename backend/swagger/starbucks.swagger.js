// starbucks.swagger.js

/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 메뉴조회하기
 *     tags: [Starbucks_Menu]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 콜드 브루
 *                          img:
 *                              type: string
 *                              example: httP://www.starbucks/menu/콜드 브루.jpg
 *
 */
