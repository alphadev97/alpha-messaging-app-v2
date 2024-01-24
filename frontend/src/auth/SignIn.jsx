import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto">
        <input
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white w-full rounded-sm">
          Login
        </button>
        <div className="text-center m-2">
          Don't have an account? <a href="/sign-up">Sing Up here</a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
