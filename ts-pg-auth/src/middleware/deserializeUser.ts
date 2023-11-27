import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import {
 excludedFields,
 findUniqueUser,
} from "../services/user.service";

export const deserializeUser = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 try {
  let access_token;

  if (
   req.headers.authorization &&
   req.headers.authorization.startsWith("Bearer")
  ) {
   access_token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.access_token) {
   access_token = req.cookies.access_token;
  }

  if (!access_token) {
   return next(new AppError(401, "You are not logged in"));
  }

  const decoded = verifyJwt<{ sub: string }>(
   access_token,
   "accessTokenPublicKey"
  );

  if (!decoded) {
   return next(new AppError(401, "Invalid Token"));
  }

  const session = await redisClient.get(decoded.sub);

  if (!session) {
   return next(new AppError(401, "Invalid Token"));
  }

  const user = await findUniqueUser({
   id: JSON.parse(session).id,
  });

  if (!user) {
   return next(new AppError(401, "Invalid Token"));
  }

  res.locals.user = omit(user, excludedFields);

  next();
 } catch (err: any) {
  next(err);
 }
};
