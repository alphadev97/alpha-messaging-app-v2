import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { toast } from "react-toastify";
import useFetcher from "../../redux/hooks/useFetcher";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { setSelectedUser, selectedUser } = useFetcher();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const resData = await res.data;
      // setSelectedUser(resData);
      navigate("/");
      toast.success("User logged in successfully!");
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
          <div className="relative flex">
            <EmailIcon className="text-black absolute top-4 left-2 text-2xl mr-2" />
            <input
              className="w-[400px] bg-[#F4EAE0] rounded-md border-gray-400 flex items-center pl-10 pt-4 pr-4 pb-4"
              type="text"
              placeholder="Enter your email"
              {...register("email")}
            />
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

          <button
            type="submit"
            className="bg-button text-buttonText w-full p-3 rounded-md "
          >
            Sign In
          </button>
        </form>

        <p className="text-text ">
          Don't Have Account?{" "}
          <Link to="/signup" className="underline font-semibold">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
