import { Prisma, PrismaClient, User } from "@prisma/client";
import redisClient from "../utils/connectRedis";
import config from "config";
import { signJwt } from "../utils/jwt";

const prisma = new PrismaClient();

export const excludedFields = [
 "password",
 "verified",
 "verificationCode",
];

export const createUser = async (
 input: Prisma.UserCreateInput
) => {
 return (await prisma.user.create({
  data: input,
 })) as User;
};

export const findUniqueUser = async (
 where: Prisma.UserWhereUniqueInput,
 select?: Prisma.UserSelect
) => {
 return (await prisma.user.findUnique({
  where,
  select,
 })) as User;
};

export const signTokens = async (
 user: Prisma.UserCreateInput
) => {
 redisClient.set(`${user.id}`, JSON.stringify(user), {
  EX: config.get<number>("redisCacheExpiresIn") * 60,
 });

 const access_token = signJwt(
  { sub: user.id },
  "accessTokenPrivateKey",
  {
   expiresIn: `${config.get<number>(
    "accessTokenExpiresIn"
   )}m`,
  }
 );

 const refresh_token = signJwt(
  { sub: user.id },
  "refreshTokenPrivateKey",
  {
   expiresIn: `${config.get<number>(
    "refreshTokenExpiresIn"
   )}m`,
  }
 );

 return { access_token, refresh_token };
};
