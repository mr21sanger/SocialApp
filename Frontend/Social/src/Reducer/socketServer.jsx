import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [data, setData] = useState({
    userId: "", // Initialize properly
    userName: "", // Initialize properly
  });

  const setUserData = (userId, userName) => {
    setData({
      userId: userId,
      userName: userName,
    });
  };

  useEffect(() => {
    socket.emit("userConnect", data);
  }, [data, socket]);

  useEffect(() => {
    socket.on("connect", (socket) => {
      console.log("connected succesfully", socket.id);
    });
  }, []);

  return (
    <SocketContext.Provider value={{ setUserData, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
