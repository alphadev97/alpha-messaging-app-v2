import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
    <div className="flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Logo />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            label="Enter Your Username"
            variant="outlined"
            className="w-[400px]"
            {...register("username")}
          />

          <TextField
            id="email"
            label="Enter Your Email"
            variant="outlined"
            className="w-[400px]"
            {...register("email")}
          />

          <TextField
            id="password"
            label="Enter Your Password"
            variant="outlined"
            className="w-[400px]"
            {...register("password")}
          />

          <TextField
            id="confirm-password"
            label="Confirm Your Password"
            variant="outlined"
            className="w-[400px]"
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: "0.75rem",
              width: "400px",
            }}
          >
            Create Account
          </Button>
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
