const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;