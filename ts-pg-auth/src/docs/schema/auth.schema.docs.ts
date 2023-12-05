import {
 OpenAPIRegistry,
 extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { ZodString, z } from "zod";
import {
 AuthSchemaParamType,
 RegisterComponentType,
} from "../types";

extendZodWithOpenApi(z);

export function ParamAuthSchemaDocs(
 registry: OpenAPIRegistry,
 param: AuthSchemaParamType
): ZodString {
 return registry.registerParameter(
  param.name,
  z.string().openapi({
   param: {
    name: param.name,
    in: param.inParam,
   },
   example: param.example,
  })
 );
}

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
