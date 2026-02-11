import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // 2. Create user (Password is hashed by the pre-save hook in the Model!)
    const user = await User.create({ name, email, password, role });

    // 3. Return token + user info
    const token = generateToken(user._id.toString(), user.role);
    res
      .status(201)
      .json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user: any = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2. Check password using our schema method
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate token
    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({ token, user: { id: user._id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
