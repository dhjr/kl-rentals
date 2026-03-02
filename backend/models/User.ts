// here we define a db schema to ensure proper data gets fed into the db.
// can also define helper methods, ensuring they are encapsulated for each schema that we define.
// means, methods defined for one schema are not usable outside of that schema.

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

// pre save hooks similar to triggers in sql.They run automatically
// this hook is used to hash passwords before saving to db.

userSchema.pre("save", async function () {
  // 'this' refers to the user document
  if (!this.isModified("password")) return;

  // read up more about salting and salting rounds.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Helper method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
