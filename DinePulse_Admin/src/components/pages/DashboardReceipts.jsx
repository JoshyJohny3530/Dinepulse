import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoPrintSharp } from "react-icons/io5";
import axios from 'axios';

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./OrderReceipt"; //Import the Receipt component

export const DashboardReceipts = () => {

  const [cartItems, setCartItems] = useState([]);
  const [selectedTotalAmount, setTotalAmount] = useState("");
  const [selectedOrderType, setOrderType] = useState("");
  const [selectedCustomerName, setCustomerName] = useState("");
  const [getOrderDetailsByStatus, setOrderDetailsByStatus] = useState([]);
  const [getSingleOrderDetailsByStatus, setSingleOrderDetailsByStatus] = useState([]);

  useEffect(() => {
    fetchDetailsByOrderStatus();
  }, []);

  const fetchDetailsByOrderStatus = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}Order/GetRecentOrdersByFilter?statusid=2`;
    try {
      const response = await axios.get(API_URL);
      const parsedData = JSON.parse(response.data.data);
      setOrderDetailsByStatus(parsedData);
    } catch (error) {
      console.error("Caught error while fetching GetRecentOrdersByFilter:", error);
      setOrderDetailsByStatus([]);
    }
  };

  const receiptRef = useRef(); //Reference for the receipt component
  const staffName = "Aimy Shaju";
  // Print handler
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handlePrintReceipt = async(orderId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}Order/GetOrderById?orderid=${orderId}`;
    try {
      const response = await axios.get(API_URL);
      const parsedData = response.data.Orders;
      

      const orderData = response.data.Orders[0]; // Extract the first order from the Orders array
      console.log(parsedData);
      console.log(JSON.stringify(orderData.Items));
      
      // Set the data to pass to the Receipt component
      setCartItems(orderData.Items);
      setTotalAmount(orderData.TotalPrice);
      setOrderType(orderData.orderType); 
      setCustomerName(orderData.customerName);
    } catch (error) {
      console.error("Caught error while fetching GetRecentOrdersByFilter:", error);
      setSingleOrderDetailsByStatus([]);
    }
  };

  //Trigger print when the state changes
  useEffect(() => {
    if (cartItems.length > 0 && selectedTotalAmount && selectedOrderType && selectedCustomerName) {
      handlePrint();
    }
  }, [cartItems, selectedTotalAmount, selectedOrderType, selectedCustomerName]);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>RECEIPTS</h3>
      </div>
      <br />
      <br />
      <div className="billsradio">
        <input type="radio" name="category" value="0" />
        <label htmlFor="aaa">ALL</label>
        <input type="radio" name="category" value="2" />
        <label htmlFor="bbbb">TAKE AWAY</label>
        <input type="radio" name="category" value="1" />
        <label htmlFor="ccc">DINE-IN</label>
        <input type="radio" name="category" value="3" />
        <label htmlFor="ddd">DELIVERY</label>
      </div>
      <div id="categories" className="aaaaaa">
        <br /> <br /> <br />
        <div className="display_categories">
          <div className="categories_table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Orders</th>
                  <th>Order Date</th>
                  <th>Total</th>
                  <th>Order Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>               
                  {getOrderDetailsByStatus.length > 0 ? (
                  getOrderDetailsByStatus.map((orderlist) => (
                      <tr key={orderlist.orderId}>
                          <td>{orderlist.orderId}</td>
                          <td>{orderlist.customerName}</td>
                          <td>{orderlist.orderItems}</td>
                          <td>{orderlist.orderDate}</td>
                          <td>${orderlist.totalPrice}</td>
                          <td>{orderlist.orderType}</td>
                          <td>
                            <IoPrintSharp className="delete_icon" onClick={() => handlePrintReceipt(orderlist.orderId)} />
                          </td>
                      </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ fontSize: "17px", color: "#bb521f", backgroundColor: "#ffe5d7", textAlign: "center" }}>No completed orders to retrieve for this day!!!</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          cartItems={cartItems}
          selectedTotalAmount={selectedTotalAmount}
          selectedOrderType={selectedOrderType}  
          customerName={selectedCustomerName}
        />
      </div>      
    </main>
  );
};
