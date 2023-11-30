import express from "express";
import { getMeHandler } from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";

const router = express.Router();

router.use(deserializeUser, requireUser);

/**
 * @openapi
 * '/api/user/me':
 *  get:
 *     tags:
 *     - User
 *     summary: Get User Information
 *     parameters:
 *       - in: cookie
 *         name: access_token
 *         schema:
 *         type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          user:
 *                            $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 */
router.get("/me", getMeHandler);

export default router;
