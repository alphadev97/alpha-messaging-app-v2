import { Outlet, Navigate } from "react-router-dom";
import useFetcher from "../redux/hooks/useFetcher";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { selectedUser, setSelectedUser } = useFetcher();
  console.log(selectedUser);

  return selectedUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
