import React, { useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import Notify from "../utils/ToastNotifications";

export const DashboardKitchen = () => {
  const [getOrderList, setOrderList] = useState([]);
  const [connection, setConnection] = useState(null);

  //Fetch Order details from the API
  const fetchIncomingOrders = async () => {
    const API_URL = process.env.REACT_APP_API_URL + "Kitchen/GetTodayOrders";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      console.log("Response Data:", response.data);
      const data = response.data.Orders; // Assuming response.data.Orders is the array
      setOrderList(data);
    } catch (error) {
      console.error("Caught error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIncomingOrders();
  }, []);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_ROOT_URL}AdminNotificationHub`)
      .build();

    setConnection(newConnection);

    newConnection.on("CustomerOrderProcessed", () => {
      fetchIncomingOrders();
    });

    newConnection.on("CustomerOrderPlaced", () => {
      fetchIncomingOrders();
    });

    newConnection
      .start()
      .then(() => console.log("SignalR Connected"))
      .catch((err) => console.error("SignalR Connection Error: ", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  const orderProcessComplete = async (orderId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}Kitchen/UpdateOrderStatus`;
    const ordersload = { orderId: orderId, status: 3 };

    try {
      await axios.post(API_URL, ordersload);
      fetchIncomingOrders();
    } catch (error) {
      console.error("Caught error while fetching UpdateOrderStatus:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>PENDING ORDERS TO PROCESS FROM KITCHEN</h3>
      </div>
      <br />
      <br />
      <div className="order-status">
        {getOrderList.length > 0 ? (
          getOrderList.map((orderslist, index) => (
            <div className="orders-count" key={index}>
              <h5>Order ID : {orderslist.orderId}</h5>
              <h5>Order Type : {orderslist.orderType}</h5>
              <h5>Order Time : {orderslist.orderTime}</h5>
              <hr />
              <div className="bg2">
                {orderslist.Items.map((item, idx) => (
                  <h5 key={idx}>
                    {item.itemName} - Quantity: {item.quantity}
                  </h5>
                ))}
                <button onClick={() => orderProcessComplete(orderslist.orderId)}>PROCESS</button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p style={{ color: "#bb521f", fontSize: "25px", margin: "40px 0" }}>
              No incoming orders !!!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
