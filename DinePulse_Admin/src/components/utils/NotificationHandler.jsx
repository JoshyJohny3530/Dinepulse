import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import Notify from "./ToastNotifications"; // Import your Notify function
import { useAuth } from "./AuthenticationHandler";
const NotificationContext = createContext();

export const useSignalR = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) return;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_ROOT_URL}AdminNotificationHub`)
      .build();

    newConnection.on("CustomerTableReserved", (reservation) => {
      Notify("New Table Reservation Request Received!!!");
    });

    newConnection.on("CustomerOrderPlaced", (order) => {
      Notify("New Order Received!!!");
    });
    newConnection.on("UserMessageReceived", (message) => {
      Notify("New User Message Received!!!");
    });
    newConnection
      .start()
      .then(() => {
        console.log("SignalR Connected.");
      })
      .catch((err) => console.log("SignalR Connection Error: ", err));

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [isLoggedIn]);

  return (
    <NotificationContext.Provider value={{ connection }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
