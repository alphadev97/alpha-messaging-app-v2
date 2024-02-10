import React from "react";
import UserCard from "./UserCard";

const FriendsList = ({ friendsList: friends }) => {
  return (
    <div className="h-[100vh] p-2">
      <UserCard
        name={friends.user.username}
        avatar={friends.user.avatar}
        isOnline={true}
      />
    </div>
  );
};

export default FriendsList;
