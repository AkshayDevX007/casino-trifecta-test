import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

export interface DatabaseUser {
  _id: string;
  email: string;
  password: string;
}
