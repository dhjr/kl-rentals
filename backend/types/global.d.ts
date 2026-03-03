import { Request, Response, NextFunction } from "express";

declare global {
  // Global type aliases
  type ExpressRequest = Request;
  type ExpressResponse = Response;
  type ExpressNext = NextFunction;

  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "user" | "seller" | "admin";
      };
    }
  }
}

// Crucial: This makes the file a module so 'declare global' works
export {};
