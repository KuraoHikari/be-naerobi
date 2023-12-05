export interface RegisterComponentType {
 name: string;
 ref: {
  $ref: string;
 };
}

export interface AuthSchemaParamType {
 name: string;
 inParam: InParamType;
 example: string;
}

export type TagType = "Auth" | "User";

export type InParamType = "cookie" | "path";
