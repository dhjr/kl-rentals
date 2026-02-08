import { Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This will be hashed!
  role: {
    type: String,
    enum: ["Member", "Dealer", "Admin"],
    default: "Member",
  },
});
