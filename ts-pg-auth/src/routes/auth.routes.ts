import express from "express";
import {
 forgotPasswordHandler,
 loginUserHandler,
 logoutUserHandler,
 refreshAccessTokenHandler,
 registerUserHandler,
 resetPasswordHandler,
 verifyEmailHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
 forgotPasswordSchema,
 loginUserSchema,
 registerUserSchema,
 resetPasswordSchema,
 verifyEmailSchema,
} from "../schema/user.schema";

const router = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *      400:
 *        description: Bad request
 */
router.post(
 "/register",
 validate(registerUserSchema),
 registerUserHandler
);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *        headers:
 *          Set-Cookie:
 *            schema:
 *            type: string
 *            example: access_token=abcde12345; Path=/; HttpOnly
 *      400:
 *        description: Bad request
 */
router.post(
 "/login",
 validate(loginUserSchema),
 loginUserHandler
);

/**
 * @openapi
 * '/api/auth/refresh':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Getting new Token with Refresh Token
 *     parameters:
 *       - in: cookie
 *         name: refresh_token
 *         schema:
 *         type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 */
router.get("/refresh", refreshAccessTokenHandler);

/**
 * @openapi
 * '/api/verifyemail/{verificationCode}':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Verifry Email after Register
 *     parameters:
 *      - name: verificationCode
 *        in: path
 *        description: Verification Code from Register User
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/VerifyEmailResponse'
 *       404:
 *         description: Product not found
 */
router.get(
 "/verifyemail/:verificationCode",
 validate(verifyEmailSchema),
 verifyEmailHandler
);

/**
 * @openapi
 * '/api/auth/forgotpassword':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Request for Forgot Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordResponse'
 *      400:
 *        description: Bad request
 */
router.post(
 "/forgotpassword",
 validate(forgotPasswordSchema),
 forgotPasswordHandler
);

/**
 * @openapi
 * '/api/resetpassword/{resetToken}':
 *  patch:
 *     tags:
 *     - Auth
 *     summary: Reset Password
 *     parameters:
 *      - name: resetToken
 *        in: path
 *        description: Reset Passord Token from Forgot Password
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordResponse'
 *       404:
 *         description: Product not found
 */
router.patch(
 "/resetpassword/:resetToken",
 validate(resetPasswordSchema),
 resetPasswordHandler
);

/**
 * @openapi
 * '/api/auth/logout':
 *  get:
 *     tags:
 *     - Auth
 *     summary: LogOut
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
 *      400:
 *        description: Bad request
 */
router.get(
 "/logout",
 deserializeUser,
 requireUser,
 logoutUserHandler
);

export default router;
