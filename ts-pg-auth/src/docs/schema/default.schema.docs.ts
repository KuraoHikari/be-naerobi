import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

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
