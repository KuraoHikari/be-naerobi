import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { ParamAuthSchemaDocs } from "../schema/auth.schema.docs";
import { DefalutResponseSchema } from "../schema/default.schema.docs";
import { TagType } from "../types";
import { z } from "zod";
import { UserSchemaDocs } from "../schema/user.schema.docs";

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
      schema: UserSchemaDocs.omit({
       id: true,
       photo: true,
       role: true,
       createdAt: true,
       updatedAt: true,
       provider: true,
      }).extend({
       passwordConfirm: z.string().openapi({
        example: "stringPassword123",
       }),
      }),
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
      schema: UserSchemaDocs.omit({
       id: true,
       name: true,
       photo: true,
       role: true,
       createdAt: true,
       updatedAt: true,
       provider: true,
      }),
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

export function RefreshTokenUserApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "get",
  path: "/api/auth/refresh",
  tags: [tag],
  description: "Get New Token with Refresh Token User",
  summary: "Get New Token with Refresh Token User",
  request: {
   cookies: z.object({
    refresh_token: ParamAuthSchemaDocs(registry, {
     name: "refresh_token",
     inParam: "cookie",
     example: "refresh_token=abcde12345; Path=/; HttpOnly",
    }),
   }),
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

export function VerifyEmailUserApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "get",
  path: "/api/verifyemail/{verificationCode}",
  tags: [tag],
  description: "Verifry Email after Register",
  summary: "Verification Code from Register User",
  request: {
   params: z.object({
    verificationCode: ParamAuthSchemaDocs(registry, {
     name: "verificationCode",
     inParam: "path",
     example: "1212121",
    }),
   }),
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

export function ForgotPasswordApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "get",
  path: "/api/auth/forgotpassword",
  tags: [tag],
  description: "Request for Forgot Password",
  summary: "Request for Forgot Password",
  request: {
   body: {
    content: {
     "application/json": {
      schema: UserSchemaDocs.omit({
       id: true,
       name: true,
       password: true,
       photo: true,
       role: true,
       createdAt: true,
       updatedAt: true,
       provider: true,
      }),
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
