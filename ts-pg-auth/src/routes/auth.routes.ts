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

router.post(
 "/register",
 validate(registerUserSchema),
 registerUserHandler
);

router.post(
 "/login",
 validate(loginUserSchema),
 loginUserHandler
);

router.get("/refresh", refreshAccessTokenHandler);

router.get(
 "/verifyemail/:verificationCode",
 validate(verifyEmailSchema),
 verifyEmailHandler
);

router.post(
 "/forgotpassword",
 validate(forgotPasswordSchema),
 forgotPasswordHandler
);

router.patch(
 "/resetpassword/:resetToken",
 validate(resetPasswordSchema),
 resetPasswordHandler
);

router.get(
 "/logout",
 deserializeUser,
 requireUser,
 logoutUserHandler
);

export default router;
