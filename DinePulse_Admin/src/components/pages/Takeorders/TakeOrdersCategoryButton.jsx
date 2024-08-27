// CategoryButton.js
import React from "react";

const CategoryButton = ({ category, selectedCategory, fetchMenus }) => (
  <button
    key={category.categoryId}
    className={selectedCategory === category.categoryName ? "active" : ""}
    onClick={() => fetchMenus(category.categoryId)}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img
        style={{ width: 50, height: 50, marginRight: 5, border: "1px solid white", borderRadius: 5 }}
        src={`${process.env.REACT_APP_IMAGE_URL}${category.categoryImage}`}
        alt="Category Icon"
      />
      <span>{category.categoryName}</span>
    </div>
  </button>
);

export default CategoryButton;
