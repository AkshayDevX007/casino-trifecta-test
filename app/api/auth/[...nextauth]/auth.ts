import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if the user exists
        const response = await fetch("http://localhost:3000/api/verifyUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        user = await response.json();

        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
});
