import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(`hi :::::; ${token}`);

  if (!token) return next(CreateError(401, "You are not Authenticated"));

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return next(CreateError(403, "Token is not Valid"));
    req.user = user;
    next();
  });
};
