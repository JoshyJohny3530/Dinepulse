import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa"; // Import icons
import CategoryButton from "./TakeOrdersCategoryButton";
import Product from "./TakeOrdersProduct";
import Cart from "./TakeOrdersCart";
import Modal from "./TakeOrdersOnHoldModal"; // Import the modal component
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import availableImage from "../../Assets/free_table.png";
import unavailableImage from "../../Assets/reserved_table.png";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "../OrderReceipt"; // Import the Receipt component

export const DashboardTakeOrders = () => {
  const [getCategoryList, setCategoryList] = useState([]);
  const [getMenuByCategoryList, setMenuByCategoryList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isModalOpenMenu, setIsModalOpenMenu] = useState(false); // State for menu modal visibility
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State for selected menu item
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuImage, setMenuImage] = useState(null);
  const [image, setImage] = useState(null);
  const [menuerrors, setMenuErrors] = useState({});
  const location = useLocation(); // Get the current location

  const [getOnHoldList, setOnHoldList] = useState([]);
  const [getTablesList, setTablesList] = useState([]);
  const [isModalOpenDinein, setIsModalOpenDinein] = useState(false); // State for menu modal visibility
  const navigate = useNavigate();
  const [selectedTableName, setSelectedTableName] = useState(""); // State to hold selected table name
  const [isContinueOrdering, setIsContinueOrdering] = useState(false); // State to handle "Continue Ordering" button click

  useEffect(() => {
    if (location.state && location.state.action === "On-Hold") {
      setIsModalOpenMenu(true); // Show the modal if action is "On-Hold"
      fetchOnHoldList();
      setSelectedTableName("");
    } else if (location.state && location.state.action === "Take-Away") {
      setSelectedTableName("");
      setIsContinueOrdering(false);
    } else if (location.state && location.state.action === "Dine-In") {
      setIsModalOpenDinein(true); // Show the modal if action is "On-Hold"
      fetchTablesList();
      setIsContinueOrdering(false);
    }
  }, [location.state]);

  //fetch category details from table
  const fetchOnHoldList = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}MenuCategory/GetAllMenuCategories`;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      const data = response.data;
      setOnHoldList(data);
    } catch (error) {
      console.error(
        "Caught error while fetching GetAllMenuCategories :",
        error
      );
    }
  };

  const fetchCategories = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}MenuCategory/GetAllMenuCategories`;
    try {
      const response = await axios.get(API_URL);
      setCategoryList(response.data);
    } catch (error) {
      console.error(
        "Caught error while fetching GetAllMenuCategories :",
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchMenus = async (categoryId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}Menu/GetMenuByCategoryId?itemId=${categoryId}`;
    try {
      const response = await axios.get(API_URL);
      setMenuByCategoryList(response.data.data);
    } catch (error) {
      console.error("Caught error while fetching GetMenuByCategoryId:", error);
    }
  };

  useEffect(() => {
    fetchMenus(1);
  }, []);

  //fetch tables details from table
  const fetchTablesList = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}Table/GetTables`;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      const data = JSON.parse(response.data.data);
      setTablesList(data);
    } catch (error) {
      console.error("Caught error while fetching GetTables :", error);
    }
  };

  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.item_id === product.item_id
    );
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex].count++;
      updatedCartItems[existingIndex].total = (
        parseFloat(updatedCartItems[existingIndex].total) +
        parseFloat(updatedCartItems[existingIndex].item_price)
      ).toFixed(2);
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, count: 1, total: product.item_price },
      ]);
    }
    alert("Product added to cart!!!")
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.item_id !== productId
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.total), 0)
      .toFixed(2);
  };

  const closeCart = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const [message, setMessage] = useState("");

  const receiptRef = useRef(); //Reference for the receipt component
  const staffName = "Aimy Shaju";
  // Print handler
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handleInsertOrders = async () => {

    let orderType = 0;
    if (location.state && location.state.action === "Take-Away") {
      orderType = 2;
    } else if (location.state && location.state.action === "Dine-In") {
      orderType = 1;
    }
  
    try {
      // Prepare the order data from cartItems
      const orderItems = cartItems.map((item) => ({
        itemId: item.item_id,
        quantity: item.count,
      }));
  
      //create the dataload for the order
      const orderDetailsload = {
        tableId: selectedTableName? selectedTableName:15,
        customerId: 1,
        orderDetails: orderItems,
        orderTypeId: orderType,
        statusId: 1,
      };
  
      const url = process.env.REACT_APP_API_URL + "MobileOrder/CreateOrder";
      const method = "post";
  
      //make the API call to insert the order
      const response = await axios({
        method,
        url,
        data: orderDetailsload,
        headers: {
          "Content-Type": "application/json", 
        },
      });
  
      if (response.status === 200) {
        setMessage("Orders inserted successfully.");
        setCartItems([]);
        //handlePrint();
      } else {
        setMessage("Failed to save orders.");
      }
    } catch (error) {
      console.error("Error saving orders", error);
      setMessage("An error occurred while processing your request.");
    }
    //handlePrint(); // Print the receipt after placing the order
  };

  const toggleModalMenu = () => {
    setIsModalOpenMenu(!isModalOpenMenu);
  };

  const handleContinueOrdering = () => {
    setIsContinueOrdering(true);
    setIsModalOpenMenu(false); // Close the on-hold modal
  };

  const toggleModalDinein = () => {
    setIsModalOpenDinein(!isModalOpenDinein);
  };

  // Function to handle table selection
  const handleTableSelection = (tableName) => {
    setSelectedTableName(tableName);
    setIsModalOpenDinein(false); // Close the dine-in modal
    //navigate("/takeorders", { table: tableName, selectedTableName : selectedTableName }); // Navigate to TakeOrders screen with table name
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>TAKE ORDERS (POS)</h3>
      </div>
      <br />
      <div className="takeorders">
        <div className="categoryvalues">
          <div className="categories">
            {getCategoryList.map((category) => (
              <CategoryButton
                key={category.categoryId}
                category={category}
                selectedCategory={selectedCategory}
                fetchMenus={fetchMenus}
              />
            ))}
            <FaShoppingCart
              className="cart-icon"
              onClick={() => setIsCartOpen(true)}
            />
            {selectedTableName && (
              <span
                style={{ marginLeft: "70px", fontSize: "17px", color: "#000" }}
              >
                Table: {selectedTableName}
              </span>
            )}
          </div>
        </div>
        <div className="content">
          <div className="products">
            {getMenuByCategoryList && getMenuByCategoryList.length > 0 ? (
              getMenuByCategoryList.map((product) => (
                <Product
                  key={product.item_id}
                  product={product}
                  addToCart={addToCart}
                  showAddToCart={
                    (location.state && location.state.action === "Take-Away") ||
                    (location.state &&
                      location.state.action === "Dine-In" &&
                      selectedTableName) ||
                    (location.state &&
                      location.state.action === "On-Hold" &&
                      isContinueOrdering)
                  }
                />
              ))
            ) : (
              <div
                style={{
                  fontSize: "17px",
                  color: "#bb521f",
                  backgroundColor: "#ffe5d7",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                No items available!!!
              </div>
            )}
          </div>

          <Cart
            cartItems={cartItems}
            isCartOpen={isCartOpen}
            isClosing={isClosing}
            closeCart={closeCart}
            removeFromCart={removeFromCart}
            calculateTotalAmount={calculateTotalAmount}
            handleInsertOrders={handleInsertOrders}
            /*handleHoldOrders={handleHoldOrders}*/
          />
        </div>
      </div>

      {/* Modal for showing on-hold order details */}
      <Modal
        isOpen={isModalOpenMenu}
        onRequestClose={toggleModalMenu}
        contentLabel="On-Hold Order Details"
      >
        <div className="add">
          <form className="flex-col">
            <div className="display_onholdorders">
              <div className="onholdorders_table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Details</th>
                      <th>Category</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOnHoldList.length > 0 ? (
                      getOnHoldList.map((categorylist) => (
                        <tr key={categorylist.categoryId}>
                          <td>{categorylist.categoryId}</td>
                          <td>{categorylist.categoryName}</td>
                          <td>{categorylist.categoryName}</td>
                          <td>{categorylist.categoryDescription}</td>
                          <td>
                            <button
                              className="onhold_continue"
                              onClick={handleContinueOrdering}
                            >
                              Continue Ordering
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            fontSize: "17px",
                            color: "#bb521f",
                            backgroundColor: "#ffe5d7",
                          }}
                        >
                          No on-hold orders for the day!!!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal for showing Dinein table list details */}
      <Modal
        isOpen={isModalOpenDinein}
        onRequestClose={toggleModalDinein}
        contentLabel="Choose from these tables"
      >
        <div className="add">
          <form className="flex-col">
            <div className="display_onholdorders">
              <div className="onholdorders_table">
                <div className="tables-grid">
                  {getTablesList.length > 0 ? (
                    getTablesList.map((table) => (
                      <div
                        key={table.table_id}
                        className="table-box"
                        onClick={() => handleTableSelection(table.table_number)}
                      >
                        <img
                          src={
                            table.table_status === "Available"
                              ? availableImage
                              : unavailableImage
                          }
                          alt={
                            table.table_status === "Available"
                              ? "Ready to occupy"
                              : "Occupied"
                          }
                          className="table-status-image"
                        />
                        <h4>Table: {table.table_number}</h4>
                        <p>Capacity: {table.table_capacity}</p>
                        <p>Status: {table.table_status}</p>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        fontSize: "17px",
                        color: "#bb521f",
                        backgroundColor: "#ffe5d7",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      No tables available!!!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Hidden Receipt Component */}
      <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          cartItems={cartItems}
          calculateTotalAmount={calculateTotalAmount}
          selectedTableName={selectedTableName}
          staffName={staffName}
        />
      </div>
    </main>
  );
};
