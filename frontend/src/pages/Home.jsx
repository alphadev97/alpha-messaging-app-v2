import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { username } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
      <p>{username}</p>
    </div>
  );
};

export default Home;
