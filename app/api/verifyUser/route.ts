import { connectToDatabase } from "@/lib/db/db";
import { User } from "@/lib/db/models/user";

import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// verify user
export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    return null;
  }

  return user;
}
