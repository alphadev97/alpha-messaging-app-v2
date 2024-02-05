// Import necessary modules
import React, { useEffect } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  // Connect to the Socket.IO server
  const socket = io("http://localhost:5500");

  useEffect(() => {
    // Listen for events from the server
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Additional event listeners can be added here based on your application's requirements

    return () => {
      // Disconnect from the server when the component unmounts
      socket.disconnect();
    };
  }, [socket]); // Make sure to include the socket in the dependency array

  return <div>{/* Your chat component content goes here */}</div>;
};

export default ChatComponent;
