// authorization middleware.
// Checks if the user has appropriate authorization when they try to perform an operation such as book a car, or add a car.
// used for avoiding access to a route, if they are not signed in, and so on.

import type { Response, NextFunction } from "express";
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
// roles is an array of authorized roles.We check if the role property in request is one that is present in the list of authorized roles or not.

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};
