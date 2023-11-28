import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
 cleanEnv(process.env, {
  DATABASE_URL: str(),
  NODE_ENV: str(),
  PORT: port(),
  POSTGRES_HOST: str(),
  POSTGRES_PORT: port(),
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),

  ACCESS_TOKEN_PRIVATE_KEY: str(),
  ACCESS_TOKEN_PUBLIC_KEY: str(),
  REFRESH_TOKEN_PRIVATE_KEY: str(),
  REFRESH_TOKEN_PUBLIC_KEY: str(),

  EMAIL_USER: str(),
  EMAIL_PASS: str(),
  EMAIL_HOST: str(),
  EMAIL_PORT: port(),
 });
};

export default validateEnv;
