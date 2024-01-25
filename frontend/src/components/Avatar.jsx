import React from "react";

const Avatar = ({ userId, username }) => {
  const colors = [
    "bg-teal-200",
    "bg-blue-200",
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-yellow-200",
  ];

  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={`${color} w-8 h-8 bg-red-200 rounded-full flex items-center justify-center`}
    >
      {username[0]}
    </div>
  );
};

export default Avatar;
