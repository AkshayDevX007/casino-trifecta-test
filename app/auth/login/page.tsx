import { validateRequest } from "@/lib/auth";
import LoginForm from "./loginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const { user } = await validateRequest();
  console.log(user, "user");
	if (user) {
		return redirect("/");
	}
  return (
   <>
   <LoginForm />
   </>
  )
}