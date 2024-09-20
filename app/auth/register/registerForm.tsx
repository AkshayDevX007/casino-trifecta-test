"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}


export default function RegisterForm() {
  const { register, formState: { errors }, handleSubmit } = useForm<RegisterProps>();
  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
    }

    if (response.status === 201) {
      toast.success("User registered successfully!");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-sky-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 rounded-md shadow-md bg-sky-900"
        >
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </label>
          {errors.email && <p role="alert" className="text-red-500 text-sm -mt-4 mb-3">{errors.email.message}</p>}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
          </label>
          {errors.name && <p role="alert" className="text-red-500 text-sm -mt-4 mb-3">{errors.name.message}</p>}
          <label className="input input-bordered flex items-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
          </label>
          {errors.password && <p role="alert" className="text-red-500 text-sm -mt-6 mb-5">{errors.password.message}</p>}
          <button type="submit" className="btn btn-primary w-full">Register</button>
          <p className="text-center mt-4">Already have an account? <Link href="/auth/login" className="hover:underline">Login here</Link></p>
        </form>
      </div>
    </>
  );
}
