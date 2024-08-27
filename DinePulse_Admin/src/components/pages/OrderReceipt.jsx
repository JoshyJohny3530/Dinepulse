import React from "react";
import restaurant_logo from "../Assets/restaurant_logo.png";

const Receipt = React.forwardRef((props, ref) => {
  const { cartItems, selectedTotalAmount, selectedOrderType, customerName } =
    props;

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="receipt-invoice" ref={ref} style={{padding:20}}>
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
        <p>Customer: {customerName}</p>
        <p>Date: {currentDate}</p>
        <p>Time: {currentTime}</p>
        <p>Order Type: {selectedOrderType}</p>
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
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>${item.itemPrice}</td>
              <td>{item.quantity}</td>
              <td>${item.itemTotalPrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Amount</td>
            <td>${selectedTotalAmount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default Receipt;
