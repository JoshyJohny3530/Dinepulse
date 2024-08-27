// Product.js
import React from "react";

const Product = ({ product, addToCart, showAddToCart }) => (
  <div key={product.item_id} className="product">
    <div className="product-row">
      <div className="item">
        <div className="img-container">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${product.item_image}`}
            alt={product.item_name}
          />
        </div>
        <h3>{product.item_name}</h3>
        <h4>${product.item_price}</h4>
        {showAddToCart && (
          <button onClick={() => addToCart(product)} className="cartButton">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Product;
