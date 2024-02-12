import UserCard from "./UserCard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const FriendsList = ({ friendsList: friends }) => {
  return (
    <div className="h-[90vh] p-2 flex flex-col justify-between items-center">
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
          <button className="flex flex-row items-center gap-2">
            <PowerSettingsNewIcon className="text-buttonDark" />
            <p className="text-buttonDark">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
