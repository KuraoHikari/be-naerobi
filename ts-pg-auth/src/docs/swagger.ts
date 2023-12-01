import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";

import * as yaml from "yaml";
import * as fs from "fs";
import {
 OpenAPIRegistry,
 OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { ExecuteAllRouteRegistry } from "./routes/index.doc";

export const registry = new OpenAPIRegistry();

ExecuteAllRouteRegistry(registry);

function getOpenApiDocumentation() {
 const generator = new OpenApiGeneratorV3(
  registry.definitions
 );

 return generator.generateDocument({
  openapi: "3.0.0",
  info: {
   version: version,
   title: "REST API Docs",
   description: "This is the API",
  },
  servers: [{ url: "http://localhost:8000" }],
 });
}

export async function writeDocumentation() {
 // OpenAPI JSON
 const docs = getOpenApiDocumentation();

 // YAML equivalent
 const fileContent = yaml.stringify(docs);

 fs.writeFileSync(
  `${__dirname}/openapi-docs.yml`,
  fileContent,
  {
   encoding: "utf-8",
  }
 );
}

writeDocumentation();

const file = fs.readFileSync(
 `${__dirname}/openapi-docs.yml`,
 "utf8"
);
const swaggerDocument = yaml.parse(file);

export function swaggerDocs(app: Express, port: number) {
 // Swagger page
 app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
 );

 // Docs in JSON format
 app.get("/docs.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJsdoc(swaggerDocument));
 });

 log.info(
  `Docs available at http://localhost:${port}/docs`
 );
}
