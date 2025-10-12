import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
 
      const authHeader = req.headers.authorization;
    
      if (!authHeader) {
        res.status(401).json({ message: "Unauthorized: No token" });
         return
      }

      const token = authHeader.split(" ")[1];
      console.log("Token",token)
      // Bearer TOKEN
      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token" });
         return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = decoded;
      
      next();
   
  }
);
