import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", { withCredentials: true });

export default socket; //default export

export const useSocketOnline = (userId) => {
  useEffect(() => {
    if (userId) {
      socket.emit("user-online", { userId });

      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);
};
