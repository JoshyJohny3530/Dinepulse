// Cart.js
import React from "react";
import { FaTimes } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Cart = ({ cartItems, isCartOpen, isClosing, closeCart, removeFromCart, calculateTotalAmount, handleInsertOrders }) => (
  <>
    {isCartOpen && (
      <>
        <div className="overlay" onClick={closeCart}></div>
        <aside className={`cart slide-panel ${isClosing ? "slide-out" : "slide-in"}`}>
          <FaTimes className="close-icon" onClick={closeCart} />
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p className="cart_empty">Cart is empty</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.item_id}>
                      <td>{index + 1}</td>
                      <td>{item.item_name}</td>
                      <td>{item.item_price}</td>
                      <td>{item.count}</td>
                      <td>{item.total}</td>
                      <td>
                        <RiDeleteBin5Fill
                          className="delete_icon"
                          onClick={() => removeFromCart(item.item_id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total">
                <p>Total Amount: ${calculateTotalAmount()}</p>
                {/*<button onClick={() => handleHoldOrders()}>Hold Order</button>*/}
                <button className="hold-button">Hold Order</button>
                <button className="confirmorder-button" onClick={() => handleInsertOrders()}>Confirm</button>
              </div>
            </>
          )}
        </aside>
      </>
    )}
  </>
);

export default Cart;
