import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import AbcIcon from "@mui/icons-material/Abc";
import KeyIcon from "@mui/icons-material/Key";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import InputError from "../../components/InputError";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, username, email, password } = data;

    console.log("URL", import.meta.env.VITE_BACKEND_API_KEY);

    if (password !== data.confirmPassword) {
      toast.error("Password must be matched");
      return;
    }

    try {
      console.log(data);
      // const res = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_API_KEY}/api/auth/signup`,
      //   {
      //     name,
      //     username,
      //     email,
      //     password,
      //   }
      // );

      // const resData = await res.data;

      // if (resData.success === true) {
      //   navigate("/login");
      //   toast.success("User is created");
      // }
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-background flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Logo />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex flex-col">
            <AbcIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <InputError message={"Name is required!"} />
            )}
          </div>

          <div className="relative flex flex-col">
            <AbcIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <InputError message={"Username is required!"} />
            )}
          </div>

          <div className="relative flex flex-col">
            <EmailIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type="text"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <InputError message={"Email is required!"} />
            )}
          </div>

          <div className="relative flex">
            <KeyIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />
            <RemoveRedEyeIcon
              className="text-black absolute top-4 right-2 text-2xl mr-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="relative flex">
            <KeyIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            <RemoveRedEyeIcon
              className="text-black absolute top-4 right-2 text-2xl mr-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <button
            type="submit"
            className="bg-button text-buttonText w-full p-3 rounded-md "
          >
            Create Account
          </button>
        </form>

        <p className="text-text ">
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
