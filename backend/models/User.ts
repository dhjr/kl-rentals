import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

// models/User.ts

// ✅ Use a regular function (not arrow function) to keep 'this' context
// ✅ Remove 'next' from the arguments if using async
userSchema.pre("save", async function () {
  // 'this' refers to the user document
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // No need to call next() here!
  // Returning from an async function is enough.
});
// Helper method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
