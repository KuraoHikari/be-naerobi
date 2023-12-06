import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { UserSchemaDocs } from "../schema/user.schema.docs";
import {
 DefalutResponseSchema,
 ParamSchemaDocs,
} from "../schema/default.schema.docs";
import { TagType } from "../types";

export function GetMeApiDoc(
 registry: OpenAPIRegistry,
 tag: TagType
): void {
 registry.registerPath({
  method: "get",
  tags: [tag],
  path: "/api/user/me",
  description: "Get User Detail",
  summary: "Get User Detail",
  request: {
   cookies: z.object({
    access_token: ParamSchemaDocs(registry, {
     name: "access_token",
     inParam: "cookie",
     example: "access_token=abcde12345; Path=/; HttpOnly",
    }),
   }),
  },
  responses: {
   200: {
    description: "Object with user data.",
    content: {
     "application/json": {
      schema: DefalutResponseSchema.omit({
       message: true,
      }).extend({
       data: UserSchemaDocs.omit({
        password: true,
       }),
      }),
     },
    },
   },
   204: {
    description: "No content - successful operation",
   },
  },
 });
}
