import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
 LoginUserInputSchemaDocs,
 RegisterUserInputSchemaDocs,
} from "../schema/auth.schema.docs";
import { DefalutResponseSchema } from "../schema/default.schema.docs";
import { TagType } from "../types";
import { z } from "zod";
import { ZodString } from "zod";

export function RegisterUserApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: [tag],
  description: "Register User",
  summary: "Register User",
  request: {
   body: {
    content: {
     "application/json": {
      schema: RegisterUserInputSchemaDocs,
     },
    },
   },
  },
  responses: {
   200: {
    description: "Object with user data.",
    content: {
     "application/json": {
      schema: DefalutResponseSchema.omit({
       data: true,
      }),
     },
    },
   },
   400: {
    description: "Bad request",
   },
  },
 });
}

export function LoginUserApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: [tag],
  description: "Login into App",
  summary: "Login User",
  request: {
   body: {
    content: {
     "application/json": {
      schema: LoginUserInputSchemaDocs,
     },
    },
   },
  },
  responses: {
   200: {
    description: "Object with user data.",
    content: {
     "application/json": {
      schema: DefalutResponseSchema.omit({
       data: true,
       message: true,
      }).extend({
       access_token: z.string(),
      }),
     },
    },
   },
   400: {
    description: "Bad request",
   },
  },
 });
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
