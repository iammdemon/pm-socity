import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: "",
  });
  // No need to return the response, and we don't call next() since this is the final response
};

export default notFound;