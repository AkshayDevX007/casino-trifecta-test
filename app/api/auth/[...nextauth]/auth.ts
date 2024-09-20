import { hashPassword } from "@/utils/hashPassword";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { VerifyUser } from "../../user/route";
import toast from "react-hot-toast";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = await hashPassword(credentials.password as string);

        // logic to verify if the user exists
        user = await VerifyUser(credentials.email as string, pwHash);

        if (!user) {
          toast.error("Invalid credentials");
        }
        toast.success("Login Successful");
        return user;
      },
    }),
  ],
});
