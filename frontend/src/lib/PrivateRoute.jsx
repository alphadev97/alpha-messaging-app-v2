import { Outlet, Navigate } from "react-router-dom";
import useFetcher from "../redux/hooks/useFetcher";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { selectedUser, setSelectedUser } = useFetcher();

  const userData = {
    id: "486545645646",
    username: "Muhammad Usama",
    password: "545454345",
  };

  useEffect(() => {
    setSelectedUser(userData);
  }, [setSelectedUser]);

  console.log(selectedUser);

  const isUser = selectedUser !== null;

  return isUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
