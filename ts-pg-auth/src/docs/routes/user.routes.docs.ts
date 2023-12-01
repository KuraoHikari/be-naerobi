import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import {
 UserIdSchemaDocs,
 UserSchemaDocs,
} from "../schema/user.schema.docs";
import { BearerAuthSchemaDocs } from "../schema/auth.schema.docs";

export function GetUser(registry: OpenAPIRegistry): void {
 registry.registerPath({
  method: "get",
  path: "/users/{id}",
  description: "Get user data by its id",
  summary: "Get a single user",
  security: [{ [BearerAuthSchemaDocs.name]: [] }],
  request: {
   params: z.object({ id: UserIdSchemaDocs(registry) }),
  },
  responses: {
   200: {
    description: "Object with user data.",
    content: {
     "application/json": {
      schema: UserSchemaDocs,
     },
    },
   },
   204: {
    description: "No content - successful operation",
   },
  },
 });
}
