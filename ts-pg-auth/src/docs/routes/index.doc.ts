import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { GetUser } from "./user.routes.docs";
import {
 ForgotPasswordApiDoc,
 LoginUserApiDoc,
 RefreshTokenUserApiDoc,
 RegisterUserApiDoc,
 VerifyEmailUserApiDoc,
} from "./auth.routes.docs";

export function ExecuteAllRouteRegistry(
 registry: OpenAPIRegistry
): void {
 RegisterUserApiDoc(registry, "Auth");
 LoginUserApiDoc(registry, "Auth");
 RefreshTokenUserApiDoc(registry, "Auth");
 VerifyEmailUserApiDoc(registry, "Auth");
 ForgotPasswordApiDoc(registry, "Auth");
 GetUser(registry);
}
