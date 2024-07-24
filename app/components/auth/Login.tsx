"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword, auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmailIcon from "/public/ph_envelope-simple-fill.svg";
import PasswordIcon from "/public/ph_lock-key-fill.svg";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      alert("Signed in successfully!");
      const userId = userCredential.user.uid; // Get the user ID from the userCredential
      router.push(`/profile?userId=${userId}`);
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full text-[#333] font-normal md:min-w-[22.5rem]"
    >
      <div className="relative">
        <label htmlFor="email" className="block text-xs leading-[1.125rem]">
          Email address
        </label>
        <Image
          src={EmailIcon}
          alt="Email Icon"
          className="absolute top-2/3 left-4 transform -translate-y-1/2"
        />
        <input
          id="email"
          {...register("email", {
            required: "Can't be empty",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email",
            },
          })}
          className={`h-12 w-full pl-10 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:shadow-customInput focus:ring-1 focus:ring-[#633CFF] ${
            errors.email
              ? "border-[#FF3939] focus:border-[#FF3939] focus:ring-[#FF3939] focus:shadow-none"
              : ""
          }`}
          placeholder="e.g. alex@email.com"
        />
        {errors.email && (
          <span className="absolute text-red-600 text-xs mt-1 right-3 bottom-4">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="password" className="block text-xs leading-[1.125rem]">
          Password
        </label>
        <Image
          src={PasswordIcon}
          alt="Password Icon"
          className="absolute top-[65%] left-4 transform -translate-y-1/2"
        />
        <input
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Please check again",
            },
          })}
          type="password"
          className={`h-12 w-full pl-10 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#633CFF] focus:shadow-customInput focus:ring-1 focus:ring-[#633CFF] ${
            errors.password
              ? "border-[#FF3939] focus:border-[#FF3939] focus:ring-[#FF3939] focus:shadow-none"
              : ""
          }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="absolute text-red-600 text-xs right-3 bottom-4">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full p-2 bg-[#633CFF] text-base text-white font-semibold rounded-lg"
      >
        Login
      </button>
      <div className="grid md:flex text-center">
        <p className="text-base text-[#737373]">Don’t have an account? </p>
        <span className="text-[#633CFF] md:pl-1">
          <Link href={"/signup"}>Create an account</Link>
        </span>
      </div>
    </form>
  );
};

export default Login;
