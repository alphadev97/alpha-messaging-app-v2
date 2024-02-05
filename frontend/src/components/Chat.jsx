// Import necessary modules
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  // Connect to the Socket.IO server
  const socket = io("http://localhost:5500");

  // State to store chat messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for events from the server
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Listen for chat messages from the server
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Additional event listeners can be added here based on your application's requirements

    return () => {
      // Disconnect from the server when the component unmounts
      socket.disconnect();
    };
  }, [socket]); // Make sure to include the socket in the dependency array

  return (
    <div>
      {/* Render chat messages */}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.user}:</strong> {message.text}
          </li>
        ))}
      </ul>

      {/* Your chat input form goes here */}
    </div>
  );
};

export default ChatComponent;
