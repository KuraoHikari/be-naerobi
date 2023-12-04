import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { GetUser } from "./user.routes.docs";
import {
 LoginUserApiDoc,
 RefreshTokenUserApiDoc,
 RegisterUserApiDoc,
} from "./auth.routes.docs";

export function ExecuteAllRouteRegistry(
 registry: OpenAPIRegistry
): void {
 RegisterUserApiDoc(registry, "Auth");
 LoginUserApiDoc(registry, "Auth");
 RefreshTokenUserApiDoc(registry, "Auth");
 GetUser(registry);
}
