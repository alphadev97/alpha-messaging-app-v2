import { createContext, useState } from "react";

export const UserContex = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContex.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContex.Provider>
  );
};
