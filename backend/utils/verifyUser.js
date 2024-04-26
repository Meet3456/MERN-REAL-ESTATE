import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // If the token is not present in the cookie, return an error
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  // Verify the token and get the user details and attach it to the request object and pass it to the next middleware
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }
    req.user = user;
    next();
  });
};
