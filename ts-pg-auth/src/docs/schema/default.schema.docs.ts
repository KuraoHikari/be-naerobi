import {
 OpenAPIRegistry,
 extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { ZodString, z } from "zod";
import { AuthSchemaParamType } from "../types";

extendZodWithOpenApi(z);

export const DefalutResponseSchema = z
 .object({
  status: z.string().openapi({
   example: "success",
  }),
  message: z.string().optional().openapi({}),
  data: z.object({}).optional().openapi({}),
 })
 .openapi("DefalutResponseSchema");

export function ParamSchemaDocs(
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
