import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/login");
    toast.success("user is created");
  };

  return (
    <div className="bg-background flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Logo />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center p-3"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />

          <input
            className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center p-3"
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />

          <input
            className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center p-3"
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />

          <input
            className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center p-3"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />

          <input
            className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center p-3"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />

          <button
            type="submit"
            className="bg-button text-buttonText w-full p-3 rounded-md "
          >
            Create Account
          </button>
        </form>

        <p>
          Have an account?{" "}
          <Link to="/login" className="underline font-semibold">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
