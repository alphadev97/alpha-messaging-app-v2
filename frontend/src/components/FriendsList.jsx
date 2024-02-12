import UserCard from "./UserCard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import axios from "axios";
import useFetcher from "../redux/hooks/useFetcher";
import { toast } from "react-toastify";

const FriendsList = ({ friendsList: friends }) => {
  const { setSelectedUser } = useFetcher();

  const handleSignOut = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_KEY}/api/auth/signout`
      );

      setSelectedUser(null);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] pt-[80px] pr-2 pb-2 pl-2 flex flex-col justify-between items-center">
      <div className="flex flex-col gap-3 w-full">
        <UserCard
          name={friends.user.username}
          avatar={friends.user.avatar}
          isOnline={true}
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="bg-buttonDark p-2 rounded-md">
          <button className="flex flex-row items-center gap-2">
            <img
              src={friends.user.avatar}
              alt={friends.user.username}
              className="w-[35px] h-[35px] rounded-full"
            />
            <p className="text-text">Profile</p>
          </button>
        </div>
        <div className="flex bg-button p-2 rounded-md justify-center">
          <button
            className="flex flex-row items-center gap-2"
            onClick={handleSignOut}
          >
            <PowerSettingsNewIcon className="text-buttonDark" />
            <p className="text-buttonDark">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
