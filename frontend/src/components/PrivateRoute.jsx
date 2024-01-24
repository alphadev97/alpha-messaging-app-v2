import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { username } = useContext(UserContext);

  return username ? <Outlet /> : <Navigate to={"sign-in"} />;
};

export default PrivateRoute;
