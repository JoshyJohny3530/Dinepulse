import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Menu.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const [getCategoryList, setCategoryList] = useState([]);
  const [getMenuByCategoryList, setMenuByCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}MenuCategory/GetAllMenuCategories`;
    try {
      const response = await axios.get(API_URL);
      setCategoryList(response.data);
      if (response.data.length > 0) {
        setSelectedCategoryId(response.data[0].categoryId);
        fetchMenuByCategory(response.data[0].categoryId);
      }
    } catch (error) {
      console.error(
        "Caught error while fetching GetAllMenuCategories :",
        error
      );
    }
  };

  const fetchMenuByCategory = async (categoryId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}Menu/GetMenuByCategoryId?itemId=${categoryId}`;
    try {
      const response = await axios.get(API_URL);
      setMenuByCategoryList(response.data.data);
    } catch (error) {
      console.error("Caught error while fetching GetMenuByCategoryId:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);
    fetchMenuByCategory(selectedCategoryId);
  };

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      const newCartItems = [
        ...cartItems,
        { ...product, count: 1, total: product.item_price },
      ];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
    }
    alert("Product added to cart!!!");
  };

  const openCartScreen = () => {
    navigate("/cart");
  }

  return (
    <div className="menu">
      <section className="food-main">
        <div className="food-main-content">
          <h2>We believe food to be almost art, almost sacred...</h2>
          <p>
            DinePulse is a gourmet paradise that entices palates with a delectable blend of world cuisines.
            We have a wide selection of delectable foods on our menu that are expertly prepared to please
            every palate. Every mouthful at DinePulse is an adventure through culinary perfection, from
            savory appetizers that set the tone for an amazing meal to masterfully prepared main meals
            showcasing the best ingredients. Our chefs create a symphony of flavors with a dedication to
            quality and innovation that turns eating into a pleasurable and unforgettable celebration of
            cuisine.
          </p>
        </div>
      </section>

      <section className="food-items">
        <div className="food">
          <h1>Explore Drinks and Food Options</h1>
          <div className='filter-col'>
            <div className="menuContents">
              <label className="label">Filter by Category:</label>&nbsp;&nbsp;&nbsp;
              <select name="category" id="category" className="textContent" onChange={handleCategoryChange} value={selectedCategoryId}>
                {getCategoryList.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <main>
            <div className="product-row">
              {getMenuByCategoryList && getMenuByCategoryList.length > 0 ? (
                getMenuByCategoryList.map((product) => (
                  <div className="item" key={product.item_id}>
                    <div className="img-container">
                      <img src={`${process.env.REACT_APP_IMAGE_URL}${product.item_image}`}
                        alt={product.item_name} />
                      <div className="overlay">
                        <p>{product.item_description}</p>
                      </div>
                    </div>
                    <h3>{product.item_name}</h3>
                    <p>${product.item_price}</p>
                    <input type="hidden" name="product_id" value={product.item_id} />
                    <input type="hidden" name="product_name" value={product.item_name} />
                    <input type="hidden" name="product_price" value={product.item_price} />
                    <input type="hidden" name="product_image" value={product.item_image} />
                    <button type="submit" className="cartButton" name="add_to_cart" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                  </div>
                ))
              ) : (
                <div className="emptymenulist">
                  No items available for this category!!!
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Menu;
