import { lucia } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db/db";
import { User } from "@/lib/db/models/user";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// login user
export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 404 }
    );
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 404 }
    );
  }

  const session = await lucia.createSession(user._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
