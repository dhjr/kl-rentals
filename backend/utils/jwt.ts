import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string) => {
  // 1. Cast the secret to string (since we know it exists in .env)
  const secret = process.env.JWT_SECRET as string;

  // 2. Ensure expiry is never undefined. Fallback to a string like '30d'.
  const expiresIn = process.env.TOKEN_EXP || "30d";

  return jwt.sign(
    { id, role },
    secret,
    { expiresIn: expiresIn as any }, // Using 'as any' here bypasses the strict overload check
  );
};
