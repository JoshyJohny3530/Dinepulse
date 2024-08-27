import React, { useState, useEffect } from "react";
import orderrecieved_icon from "../Assets/orderrecieved_icon.png";
import orderdelivered_icon from "../Assets/orderdelivered_icon.png";
import orderpending_icon from "../Assets/orderpending_icon.png";
import netrevenue_icon from "../Assets/netrevenue_icon.png";
import axios from "axios";

export const AdminDashboard = () => {
  const [orderRecieved, setOrderRecieved] = useState(0);
  const [orderPending, setOrderPending] = useState(0);
  const [orderDelivered, setOrderDelivered] = useState(0);
  const [netRevenue, setNetRevenue] = useState(0.0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const API_URL =
      process.env.REACT_APP_API_URL + "Dashboard/GetDashboardData";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        //console.log('Get received, pending, delivered, and netrevenue values: ', response.data);
        const data = response.data.data[0];
        //update state with converted values
        setOrderRecieved(parseInt(data.OrderReceived, 10));
        setOrderPending(parseInt(data.OrderPending, 10));
        setOrderDelivered(parseInt(data.OrderDelivered, 10));
        setNetRevenue(parseFloat(data.NetRevenue));
      })
      .catch((error) => {
        //alert("Caught error while fetching DashboardData: "+error);
        console.error("Caught error while fetching GetDashboardData: ", error);
      });

    //fetching recent orders
    getRecentOrders();
  }, []);

  const getRecentOrders = () => {
    const API_URL = process.env.REACT_APP_API_URL + "Dashboard/GetRecentOrders";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        //console.log('Recent Orders Data : ', response.data);
        const data = response.data.data;
        setRecentOrders(data);
      })
      .catch((error) => {
        //alert("Caught error while fetching RecentOrders: "+ error);
        console.error("Caught error while fetching GetRecentOrders: ", error);
      });
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <img
              src={orderrecieved_icon}
              alt="Dinepulse logo"
              className="orders_icon"
            />
            <h3>ORDER RECEIVED</h3>
            <h1>{orderRecieved}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <img
              src={orderdelivered_icon}
              alt="Dinepulse logo"
              className="orders_icon"
            />
            <h3>ORDER DELIVERED</h3>
            <h1>{orderDelivered}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <img
              src={orderpending_icon}
              alt="Dinepulse logo"
              className="orders_icon"
            />
            <h3>ORDER PENDING</h3>
            <h1>{orderPending}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <img
              src={netrevenue_icon}
              alt="Dinepulse logo"
              className="orders_icon"
            />
            <h3>NET REVENUE</h3>
            <h1>${netRevenue}</h1>
          </div>
        </div>
      </div>
      <div className="display_recentorders">
        <h4 className="tagname">Recent Orders</h4>
        <div className="orders_table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Orders</th>
                <th>Order Date</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Order Type</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderItems}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.quantities}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.orderType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      fontSize: "17px",
                      color: "#bb521f",
                      backgroundColor: "#ffe5d7",
                      textAlign: "center",
                    }}
                  >
                    No orders to retrieve for this day!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
