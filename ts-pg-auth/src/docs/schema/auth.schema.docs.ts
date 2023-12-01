import {
 OpenAPIRegistry,
 extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { RegisterComponentType } from "../types";

extendZodWithOpenApi(z);

export const RegisterUserInputSchemaDocs = z
 .object({
  name: z.string().openapi({
   description: "Name of the user",
   example: "John Doe",
  }),
  email: z.string().openapi({
   format: "email",
   description: "Email address of the user",
   example: "jane.doe@example.com",
  }),
  password: z.string().openapi({
   example: "stringPassword123",
  }),
  passwordConfirm: z.string().openapi({
   example: "stringPassword123",
  }),
 })
 .openapi("RegisterUserInput");

export const LoginUserInputSchemaDocs = z
 .object({
  email: z.string().openapi({
   format: "email",
   description: "Email address of the user",
   example: "jane.doe@example.com",
  }),
  password: z.string().openapi({
   example: "stringPassword123",
  }),
 })
 .openapi("LoginUserInput");

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
