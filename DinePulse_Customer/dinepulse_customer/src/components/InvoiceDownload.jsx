import React from "react";
import restaurant_logo from "../assets/restaurant_logo.png";
import "../styles/InvoiceDownload.css";

const Receipt = React.forwardRef((props, ref) => {
  const { cartItems, calculateTotalAmount, customerName } =
    props;

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div ref={ref} style={{padding:20}}>
      <div className="receipt-header">
        <img
          src={restaurant_logo}
          alt="Restaurant Logo"
          className="restaurant-logo"
        />
        <h2>Dine-pulse</h2>
        <p>299 Doon South, Kitchener</p>
        <p>Contact: 111-222-3333</p>
        <p>Email: doonsouth@gmail.com</p>
      </div>
      <hr />
      <div className="receipt-details">
        <p>CustomerID: {customerName}</p>
        <p>Date: {currentDate}</p>
        <p>Time: {currentTime}</p>
      </div>
      <hr />
      <h3>Order Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.item_id}>
              <td>{item.item_name}</td>
              <td>${item.item_price}</td>
              <td>{item.count}</td>
              <td>${item.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Amount</td>
            <td>${calculateTotalAmount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default Receipt;
