import React, { useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import Notify from "../utils/ToastNotifications";

export const DashboardMessages = () => {
  const [getMessageList, setMessageList] = useState([]);
  const [connection, setConnection] = useState(null);

  // Fetch user messages from the table
  const fetchMessages = async () => {
    const API_URL =
      process.env.REACT_APP_API_URL + "UserMessage/GetUserMessages";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      console.log("Response Data:", response.data);
      const data = JSON.parse(response.data.data);
      setMessageList(data);
    } catch (error) {
      console.error("Caught error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_ROOT_URL}AdminNotificationHub`)
      .build();

    setConnection(newConnection);

    newConnection.on("UserMessageReceived", (message) => {
      fetchMessages();
      //Notify("New User Message Received!");
    });

    newConnection
      .start()
      .catch((err) => console.error("SignalR Connection Error: ", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>User Messages</h3>
      </div>
      <br />
      <br />

      <div id="messages" className="messages">
        <div className="display_reservations">
          <div className="reservation_table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Message</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {getMessageList.length > 0 ? (
                  getMessageList.map((message) => (
                    <tr key={message.Id}>
                      <td>{message.Id}</td>
                      <td>{message.Name}</td>
                      <td>{message.Email}</td>
                      <td>{message.PhoneNumber}</td>
                      <td>{message.Message}</td>
                      <td>{new Date(message.CreatedAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        fontSize: "17px",
                        color: "#bb521f",
                        backgroundColor: "#ffe5d7",
                        textAlign: "center",
                      }}
                    >
                      No messages to retrieve!!!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
