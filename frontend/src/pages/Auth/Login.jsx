import Logo from "../../components/Logo";

const Login = () => {
  return (
    <div className="flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Logo />
        <input
          className="border border-gray-500 p-3 w-[400px] rounded-md"
          type="text"
          placeholder="Your Email Address"
        />
        <input
          className="border border-gray-500 p-3 w-[400px] rounded-md"
          type="password"
          placeholder="Your Password"
        />
        <button className="bg-blue-500 text-white hover:bg-black hover:text-white transition p-3 w-[400px] rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
