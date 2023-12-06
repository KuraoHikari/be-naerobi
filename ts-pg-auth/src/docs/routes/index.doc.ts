import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
 ForgotPasswordApiDoc,
 LogOutUserApiDoc,
 LoginUserApiDoc,
 RefreshTokenUserApiDoc,
 RegisterUserApiDoc,
 ResetPasswordApiDoc,
 VerifyEmailUserApiDoc,
} from "./auth.routes.docs";
import { GetMeApiDoc } from "./user.routes.docs";

export function ExecuteAllRouteRegistry(
 registry: OpenAPIRegistry
): void {
 RegisterUserApiDoc(registry, "Auth");
 LoginUserApiDoc(registry, "Auth");
 RefreshTokenUserApiDoc(registry, "Auth");
 VerifyEmailUserApiDoc(registry, "Auth");
 ForgotPasswordApiDoc(registry, "Auth");
 ResetPasswordApiDoc(registry, "Auth");
 LogOutUserApiDoc(registry, "Auth");
 GetMeApiDoc(registry, "User");
}
