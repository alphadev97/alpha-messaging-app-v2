import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/user/signup", {
      username,
      password,
    });

    setLoggedInUsername(username);
    setId(data.id);

    localStorage.setItem("token", data.token);

    navigate("/");
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
        <div className="text-center m-2">
          Already a member? <a href="/sign-in">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
