import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.error("[401] Unauthorized: Token not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error("[401/auth.middleware] Unauthorizd: Token invalid");
    return res.status(401).json({ error: "Unauthorized: Token invalid" });
  }
};
