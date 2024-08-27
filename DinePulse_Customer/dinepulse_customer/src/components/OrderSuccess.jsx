import React from "react";
import "../styles/OrderSuccess.css";
import { FaFilePdf } from "react-icons/fa6";
import orderSuccessImage from "../assets/orderSuccessImage.png";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./InvoiceDownload"; //

const OrderSuccess = () => {

  const receiptRef = useRef(); // Reference for the receipt component
  const customerID = localStorage.getItem('customerID');
  const cartItems = localStorage.getItem('cartItems');
  const cartItemsString = JSON.parse(cartItems);
  const totalAmountToPay = localStorage.getItem('totalPayable');

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const showReceipt = () => {
    handlePrint();
    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <div className="ordersuccess">
      <br/><br/>
      <main> 
            <div className="confirmMessage">
                <img src={orderSuccessImage} alt="Order Success" className="invoice" />
                <h1>Congratulations!!! <br /> Your Order has been placed successfully !!!</h1>
                <br/><br/>
                <a href="#" onClick={() => showReceipt()}>
                    <FaFilePdf className="icons"/><br/>
                    <span className="invoice"> Click to view your order invoice</span>                                       
                </a>
            </div>
        </main>

        {/* Hidden Receipt Component */}
        <div style={{ display: "none" }}>
          <Receipt
            ref={receiptRef}
            cartItems={cartItemsString}
            calculateTotalAmount={totalAmountToPay}
            customerName={customerID}
          />
        </div>    
      </div>
  );
};

export default OrderSuccess;