// token generation and token signing utilities

import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string) => {
  const secret = process.env.JWT_SECRET as string;

  // 2. Ensure expiry is never undefined. Fallback to a string like '30d'.
  const expiresIn = process.env.TOKEN_EXP || "1d";

  return jwt.sign({ id, role }, secret, { expiresIn: expiresIn as any });
};
