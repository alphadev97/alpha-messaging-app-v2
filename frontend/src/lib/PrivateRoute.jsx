import { Outlet, Navigate, useNavigate } from "react-router-dom";
import useFetcher from "../redux/hooks/useFetcher";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { selectedUser, setSelectedUser } = useFetcher();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_KEY}/api/user/view`,
        { withCredentials: true }
      );

      setSelectedUser(res.data);
    } catch (error) {
      navigate("/login");
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return selectedUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
