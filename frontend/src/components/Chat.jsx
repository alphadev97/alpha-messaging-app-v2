// Import necessary modules
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  // Use useRef to persist the socket instance
  const socketRef = useRef();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io("http://localhost:5500");

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socketRef.current.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMessage);
    socketRef.current.emit("message", newMessage);
  };

  return (
    <div>
      {messages}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.user}:</strong> {message.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Message"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
