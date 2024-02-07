import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import ThemeToggle from "../../lib/ThemeToggle";

// ANTD

import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-background flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <ThemeToggle />
        <Logo />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="large"
            placeholder="Enter Your Email"
            className="w-[400px] bg-[#F4EAE0] border-text flex items-center p-3"
            prefix={
              <MailOutlined className="bg-black p-2 text-[#F4EAE0] rounded-full mr-2" />
            }
            {...register("email")}
          />

          <Input
            size="large"
            placeholder="Enter Your Password"
            className="w-[400px] bg-[#F4EAE0] border-text flex items-center p-3"
            prefix={
              <KeyOutlined className="bg-black p-2 text-[#F4EAE0] rounded-full mr-2" />
            }
            {...register("password")}
          />

          <button
            type="submite"
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
