import SignUp from "../components/auth/SignUp";
import Logo from "../components/icons/Logo";

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col gap-16 md:gap-[3.1875rem] md:items-center justify-center">
      <div className="px-8">
        <Logo />
      </div>
      <div className="p-8 bg-white">
        <div className="grid grid-cols-1 gap-9">
          <div className="grid gap-2">
            <h1 className="text-[2rem] text-[#333] font-bold">
              Create account
            </h1>
            <p className="text-base text-[#737373]">
              Let’s get you started sharing your links!
            </p>
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
