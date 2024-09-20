import { connectToDatabase } from "@/lib/db/db";
import { User } from "@/lib/db/models/user";
import bcrypt from "bcryptjs";


// verify user
export async function VerifyUser(email: string, password: string) {
    await connectToDatabase();
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
  
    if (!isPasswordValid) {
      return null
    }
  
    return user
  }
  