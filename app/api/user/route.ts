import { connectToDatabase } from "@/lib/db/db";
import { User } from "@/lib/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/hashPassword";

// create user
export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { name, email, password } = await request.json();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const existingUserWithSameName = await User.findOne({ name });

  if (existingUserWithSameName) {
    return NextResponse.json(
      { message: "User with same name already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json(user, { status: 201 });
}

// get all users
export async function GET() {
  await connectToDatabase();

  const users = await User.find({});

  return NextResponse.json({ users });
}
