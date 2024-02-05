import Avatar from "./Avatar";

const People = ({ id, username, onClick, selected, online }) => {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={`${
        selected ? "bg-gray-100" : ""
      } m-2 rounded-lg shadow-sm flex gap-2 cursor-pointer`}
    >
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span>{username}</span>
      </div>
    </div>
  );
};

export default People;
