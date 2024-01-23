import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    await axios.post("/api/user/signup", { username, password });
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto" onSubmit={register}>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
