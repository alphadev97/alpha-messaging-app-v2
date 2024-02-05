import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const SingleMessage = ({ message }) => {
  const { username, id } = useContext(UserContext);

  return (
    <div
      key={message._id}
      className={`${message.sender === id ? "text-right" : "text-left"}`}
    >
      <div className={`text-left inline-block my-2 text-sm `}>
        {message.file && (
          <div className="flex flex-col items-center">
            <img
              src={`${axios.defaults.baseURL}/uploads/${message.file}`}
              alt=""
              className="w-[200px] h-[200px]"
            />

            <a
              target="_blank"
              className="underline flex items-center gap-2"
              href={`${axios.defaults.baseURL}/uploads/${message.file}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
              {message.file}
            </a>
          </div>
        )}
        <div
          className={`w-full p-3 rounded-t-3xl shadow-lg ${
            message.sender === id
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {message.text}
        </div>

        <div className="bg-gray-200 p-2 flex justify-center rounded-b-3xl">
          {message.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Just Now"}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
