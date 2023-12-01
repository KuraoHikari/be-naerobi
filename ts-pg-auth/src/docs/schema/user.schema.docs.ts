import {
 OpenAPIRegistry,
 extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { ZodString, z } from "zod";

extendZodWithOpenApi(z);

export function UserIdSchemaDocs(
 registry: OpenAPIRegistry
): ZodString {
 return registry.registerParameter(
  "UserId",
  z.string().openapi({
   param: {
    name: "id",
    in: "path",
   },
   example: "1212121",
  })
 );
}

export const UserSchemaDocs = z
 .object({
  id: z.string().openapi({
   format: "uuid",
   description: "Unique identifier for the user",
   example: "35681813-8ad3-476d-99f2-56d5f5647127",
  }),
  name: z.string().openapi({
   description: "Name of the user",
   example: "John Doe",
  }),
  email: z.string().openapi({
   format: "email",
   description: "Email address of the user",
   example: "John Doe",
  }),
  photo: z.string().openapi({
   format: "email",
   description: "User's profile photo",
   example: "John Doe",
  }),
  role: z.string().optional().openapi({
   description: "Role of the user",
   example: "user",
  }),
  createdAt: z.string().openapi({
   format: "date-time",
   description: "Date and time when the user was created",
   example: "2023-11-28T09:09:47.319Z",
  }),
  updatedAt: z.string().openapi({
   format: "date-time",
   description:
    "Date and time when the user was last updated",
   example: "2023-11-28T09:09:47.319Z",
  }),
  provider: z.string().optional().nullable().openapi({
   description: "User's provider information",
  }),
 })
 .openapi("User");
