// middleware to check if we have the required authorization.Checks if the user has appropriate authorization when they try to perform an operation such as book a car, or add a car.

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach user info (id, role) to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

// Authorization: Check if the user is an 'admin'
export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};
