import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = ({ setWs }) => {
  const { username, setId, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    axios.post("/api/user/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
      navigate("/sign-in");
    });
  };

  return (
    <div className="p-2 text-center flex items-center justify-center">
      <span className="mr-2 text-gray-600 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>

        {username}
      </span>
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
