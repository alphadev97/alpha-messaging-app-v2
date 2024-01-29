import Avatar from "./Avatar";

const People = ({ id, username, onClick, selected, online }) => {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={`${
        selected ? "bg-blue-100" : ""
      } border-b border-gray-100 flex gap-2 cursor-pointer`}
    >
      {selected && <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span>{username}</span>
      </div>
    </div>
  );
};

export default People;
