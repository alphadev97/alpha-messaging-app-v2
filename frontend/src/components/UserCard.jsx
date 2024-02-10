const UserCard = ({ name, avatar, isOnline }) => {
  return (
    <div className="bg-buttonDark flex w-full p-2 items-center gap-4 rounded-md shadow-md">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        width={45}
        height={45}
        className={`rounded-full ${isOnline && "border-2 border-green-600"} `}
      />
      <h2 className="font-semibold text-text">{name}</h2>
    </div>
  );
};

export default UserCard;
