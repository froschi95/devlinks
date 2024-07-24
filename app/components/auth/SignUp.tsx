"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, auth, db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import EmailIcon from "/public/ph_envelope-simple-fill.svg";
import PasswordIcon from "/public/ph_lock-key-fill.svg";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await setDoc(doc(collection(db, "profiles"), user.uid), {
        email: data.email,
        firstName: "", // Add additional fields as needed
        lastName: "",
        profilePicture: "",
      });
      alert("Signed up successfully!");
      router.push("/login");
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(errorMessage);
    }
  };
  const password = watch("password");

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
          {...register("email", { required: "Can't be empty" })}
          className="input w-full pl-10 py-2 border rounded-lg"
          placeholder="e.g. alex@email.com"
        />
        {errors.email && (
          <span className="absolute text-red-600 text-xs mt-1 right-3 bottom-3">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="password" className="block text-xs leading-[1.125rem]">
          Create password
        </label>
        <Image
          src={PasswordIcon}
          alt="Password Icon"
          className="absolute top-2/3 left-4 transform -translate-y-1/2"
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
          className="input w-full pl-10 py-2 border rounded-lg"
          placeholder="At least 8 characters"
        />
        {errors.password && (
          <span className="absolute text-red-600 text-xs mt-1 right-3 bottom-3">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="block text-xs leading-[1.125rem]"
        >
          Confirm password
        </label>
        <Image
          src={PasswordIcon}
          alt="Confirm Password Icon"
          className="absolute top-2/3 left-4 transform -translate-y-1/2"
        />
        <input
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          className="input w-full pl-10 py-2  border rounded-lg"
          placeholder="At least 8 characters"
        />
        {errors.confirmPassword && (
          <span className="absolute text-red-600 text-xs mt-1 right-3 bottom-3">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <p className="text-xs text-[#737373]">
        Password must contain at least 8 characters
      </p>
      <button
        type="submit"
        className="btn btn-primary w-full p-2 bg-[#633CFF] text-base text-white font-semibold rounded-lg"
      >
        Create new account
      </button>
      <div className="grid md:flex text-center">
        <p className="text-base text-[#737373]">Already have an account? </p>
        <span className="text-[#633CFF] md:pl-1">
          <Link href={"/login"}>Login</Link>
        </span>
      </div>
    </form>
  );
};

export default SignUp;
