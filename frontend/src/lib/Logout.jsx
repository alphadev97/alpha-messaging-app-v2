import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setId, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    axios.post("/api/user/logout").then(() => {
      setId(null);
      setUsername(null);
      navigate("/sign-in");
    });
  };

  return (
    <div className="p-2 text-center">
      <button
        onClick={logout}
        className="text-sm bg-blue-50 py-1 px-2 border rounded-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
