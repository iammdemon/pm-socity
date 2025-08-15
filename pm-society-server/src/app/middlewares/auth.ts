import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import catchAsync from "../utils/catchAsync";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get token from Authorization header instead of cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token" });
      return;
    }

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;
    next();
  }
);