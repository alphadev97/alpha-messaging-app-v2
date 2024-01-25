import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Chat from "./Chat";

const Home = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;
