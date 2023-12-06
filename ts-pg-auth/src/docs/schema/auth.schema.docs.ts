import {
 OpenAPIRegistry,
 extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { ZodString, z } from "zod";
import { RegisterComponentType } from "../types";

extendZodWithOpenApi(z);

export function BearerAuthSchemaDocs(
 registry: OpenAPIRegistry
): RegisterComponentType {
 return registry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  {
   type: "http",
   scheme: "bearer",
   bearerFormat: "JWT",
  }
 );
}

export function AccessTokenCookieSchemaDocs(
 registry: OpenAPIRegistry
): ZodString {
 return registry.registerParameter(
  "Cookie",
  z.string().openapi({
   param: {
    name: "access_token",
    in: "cookie",
   },
   example: "access_token=abcde12345; Path=/; HttpOnly",
  })
 );
}
