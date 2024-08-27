import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAddToPhotos } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import upload_image from "../Assets/upload_image.png";

//set the app element for accessibility
Modal.setAppElement("#root");

export const DashboardProducts = () => {
  const [activeTab, setActiveTab] = useState("CATEGORIES");
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  //state for category list
  const [getCategoryList, setCategoryList] = useState([]);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  //state for menu list
  const [getMenuList, setMenuList] = useState([]);
  const [isModalOpenMenu, setIsModalOpenMenu] = useState(false);

  //state for selected category operation : insert new or updating one
  const [selectedCategory, setSelectedCategory] = useState(null);
  //state for selected menu operation : insert new or updating one
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  //state for displaying messages after operation
  const [message, setMessage] = useState("");

  //state for both category and menu image name storage
  const [image, setImage] = useState(null);

  //state for category input fields
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  //state for menu input fields
  const [menuImage, setMenuImage] = useState(null);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuPrice, setMenuPrice] = useState("");

  //state for category inputs validation errors
  const [errors, setErrors] = useState({});
  //state for menu inputs validation errors
  const [menuerrors, setMenuErrors] = useState({});

  //open category popup
  const toggleModalCategory = () => {
    if (isModalOpenCategory) {
      setSelectedCategory(null);
      setCategoryName("");
      setCategoryDescription("");
      setCategoryImage(null);
      setImage(null);
      setErrors({}); //clear category validation errors when closing the modal
    } else {
      setErrors({});
    }
    setIsModalOpenCategory(!isModalOpenCategory);
  };

  //open menu popup
  const toggleModalMenu = () => {
    if (isModalOpenMenu) {
      setSelectedMenuItem(null);
      setMenuName("");
      setMenuDescription("");
      setMenuCategory("");
      setMenuPrice("");
      setMenuImage(null);
      setImage(null);
      setMenuErrors({}); //clear menu validation errors when opening the modal
    } else {
      setMenuErrors({});
    }
    setIsModalOpenMenu(!isModalOpenMenu);
  };

  //fetch category details from table
  const fetchCategories = async () => {
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
      setCategoryList(data);
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

  //fetch menu details from table
  const fetchMenus = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}Menu/GetMenuItemsAll`;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      const data = response.data.data;
      setMenuList(data);
    } catch (error) {
      console.error("Caught error while fetching GetMenuItemsAll:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  //function to validate category form inputs
  const validateCategoryForm = () => {
    const errors = {};
    if (!categoryName.trim()) {
      errors.categoryName = "Category Name is required.";
    }
    if (!categoryDescription.trim()) {
      errors.categoryDescription = "Category Description is required.";
    }
    if (!categoryImage && !selectedCategory) {
      errors.categoryImage = "Category Image is required.";
    }
    return errors;
  };

  //function to validate menu form inputs
  const validateMenuForm = () => {
    const menuerrors = {};
    if (!menuName.trim()) {
      menuerrors.menuName = "Product Name is required.";
    }
    if (!menuDescription.trim()) {
      menuerrors.menuDescription = "Product Description is required.";
    }
    if (!menuCategory.trim()) {
      menuerrors.menuCategory = "Product Category is required.";
    }
    if (!menuPrice.trim()) {
      menuerrors.menuPrice = "Product Price is required.";
    }
    if (!menuImage && !selectedMenuItem) {
      menuerrors.menuImage = "Product Image is required.";
    }
    return menuerrors;
  };

  //popup insert and update functionality of categories section
  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    const errors = validateCategoryForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    console.log("category name ==> " + categoryName);
    console.log("category description ==> " + categoryDescription);
    console.log("category imagename ==> " + image);
    console.log("category image ==> " + categoryImage);

    const formData = new FormData();
    formData.append("categoryModel.CategoryName", categoryName);
    formData.append("categoryModel.CategoryDescription", categoryDescription);
    formData.append("categoryImage", categoryImage);

    if (selectedCategory) {
      formData.append("categoryModel.categoryId", selectedCategory.categoryId);
      formData.append("categoryModel.categoryImage", categoryImage);
    }

    try {
      const url = selectedCategory
        ? `${process.env.REACT_APP_API_URL}MenuCategory/UpdateMenuCategory`
        : `${process.env.REACT_APP_API_URL}MenuCategory/InsertCategory`;

      const method = selectedCategory ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage(
          selectedCategory
            ? "Category updated successfully."
            : "Category inserted successfully."
        );
        setIsModalOpenCategory(false);
        setCategoryName("");
        setCategoryDescription("");
        setCategoryImage(null);
        setImage(null);
        setSelectedCategory(null);
        fetchCategories();
      } else {
        setMessage("Failed to save category item.");
      }
    } catch (error) {
      console.error("Error saving category", error);
      setMessage(
        "An error occurred while processing your Add/Edit Category request."
      );
    }
  };

  //popup insert and update functionality of menu section
  const handleSubmitMenu = async (e) => {
    e.preventDefault();

    const menuerrors = validateMenuForm();
    if (Object.keys(menuerrors).length > 0) {
      setMenuErrors(menuerrors);
      return;
    }

    const formData = new FormData();
    formData.append("menuModel.ItemName", menuName);
    formData.append("menuModel.ItemCategory", menuCategory);
    formData.append("menuModel.ItemDescription", menuDescription);
    formData.append("menuModel.ItemPrice", menuPrice);
    formData.append("ItemImage", menuImage);
    if (selectedMenuItem) {
      formData.append("menuModel.ItemId", selectedMenuItem.id);
      formData.append("menuModel.ItemImage", menuImage);
    }

    /*console.log("menu category ==> "+menuCategory);
    console.log("menu name ==> "+menuName);
    console.log("menu description ==> "+menuDescription);
    console.log("menu price ==> "+menuPrice);
    console.log("menu image ==> "+menuImage);*/

    try {
      const url = selectedMenuItem
        ? `${process.env.REACT_APP_API_URL}Menu/UpdateMenuItem`
        : `${process.env.REACT_APP_API_URL}Menu/InsertMenuItem`;

      const method = selectedMenuItem ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage(
          setSelectedMenuItem
            ? "Menu updated successfully."
            : "Menu inserted successfully."
        );

        setIsModalOpenMenu(false);
        setMenuName("");
        setMenuDescription("");
        setMenuCategory("");
        setMenuPrice("");
        setMenuImage(null);
        setImage(null);
        setSelectedMenuItem(null);
        fetchMenus();
      } else {
        setMessage("Failed to save menu.");
      }
    } catch (error) {
      console.error("Error saving menu", error);
      setMessage(
        "An error occurred while processing your Add/Edit Menuitem request."
      );
    }
  };

  //function to handle editing a category item
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
    setCategoryImage(category.categoryImage);
    setImage(null);
    setErrors({});
    toggleModalCategory();
  };

  //function to handle editing a menu item
  const handleEditMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setMenuName(menuItem.name);
    setMenuDescription(menuItem.description);
    setMenuCategory(menuItem.category);
    setMenuPrice(menuItem.price);
    setMenuImage(menuItem.menuimage);
    setImage(null);
    setMenuErrors({});
    toggleModalMenu();
  };

  //handle the popup category delete functionality
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] =
    useState(null);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  //handle the popup menu delete functionality
  const [selectedMenuToDelete, setSelectedMenuToDelete] = useState(null);
  const [isDeleteMenuModalOpen, setIsDeleteMenuModalOpen] = useState(false);

  //function to open the category delete modal
  const openDeleteCategoryModal = (category) => {
    setSelectedCategoryToDelete(category);
    setIsDeleteCategoryModalOpen(true);
  };

  //function to close the category delete modal
  const closeDeleteCategoryModal = () => {
    setSelectedCategoryToDelete(null);
    setIsDeleteCategoryModalOpen(false);
  };

  // Function to open the menu delete modal
  const openDeleteMenuModal = (menu) => {
    setSelectedMenuToDelete(menu);
    setIsDeleteMenuModalOpen(true);
  };

  // Function to close the menu delete modal
  const closeDeleteMenuModal = () => {
    setSelectedMenuToDelete(null);
    setIsDeleteMenuModalOpen(false);
  };

  //modify the handleDeleteCategory function to directly open the delete modal
  const handleDeleteCategory = (categoryId) => {
    const categoryToDelete = getCategoryList.find(
      (category) => category.categoryId === categoryId
    );
    openDeleteCategoryModal(categoryToDelete);
  };

  const handleConfirmDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}MenuCategory/DeleteMenuCategory/${categoryId}`
      );
      if (response.status === 200) {
        setMessage("Category deleted successfully.");
        setCategoryList(
          getCategoryList.filter(
            (category) => category.categoryId !== categoryId
          )
        );
        setIsDeleteCategoryModalOpen(false);
      } else {
        setMessage("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //modify the handleDeleteMenu function to directly open the delete modal
  const handleDeleteMenu = (menuId) => {
    const menuToDelete = getMenuList.find((menu) => menu.id === menuId);
    openDeleteMenuModal(menuToDelete);
  };

  const handleConfirmDeleteMenu = async (menuId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}Menu/DeleteMenuItem/${menuId}`
      );
      if (response.status === 200) {
        setMessage("Menu deleted successfully.");
        setMenuList(getMenuList.filter((menu) => menu.id !== menuId));
        setIsDeleteMenuModalOpen(false);
      } else {
        setMessage("Failed to delete menu.");
      }
    } catch (error) {
      console.error("Error deleting menu", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>CATEGORIES AND MENU</h3>
      </div>
      <br />
      <br />

      <div className="tab">
        <button
          className={`tablinks ${activeTab === "CATEGORIES" ? "active" : ""}`}
          onClick={() => openTab("CATEGORIES")}
        >
          CATEGORIES
        </button>
        <button
          className={`tablinks ${activeTab === "MENU" ? "active" : ""}`}
          onClick={() => openTab("MENU")}
        >
          MENU
        </button>
      </div>

      {/*displays category table details */}
      <div
        id="categories"
        className={`tabcontent ${activeTab === "CATEGORIES" ? "active" : ""}`}
      >
        <button className="addnew_btn" onClick={toggleModalCategory}>
          <b>
            <span className="addnew_text">ADD NEW CATEGORY</span>
          </b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_categories">
          <div className="categories_table">
            <table>
              <thead>
                <tr>
                  <th>Category ID</th>
                  <th>Category Image</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCategoryList.map((categorylist) => (
                  <tr key={categorylist.categoryId}>
                    <td>{categorylist.categoryId}</td>
                    <td style={{ TextAlign: "center" }}>
                        <img
                          src={`${process.env.REACT_APP_IMAGE_URL}${categorylist.categoryImage}`}
                          className="categoryImage"
                          alt={categorylist.categoryName}
                          style={{ display: "block", margin: "0 auto" }}
                        />
                    </td>
                    <td>{categorylist.categoryName}</td>
                    <td>{categorylist.categoryDescription}</td>
                    <td>
                      <FaEdit
                        className="editcategory_icon"
                        onClick={() => handleEditCategory(categorylist)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <RiDeleteBin5Fill
                        className="deletecategory_icon"
                        onClick={() =>
                          handleDeleteCategory(categorylist.categoryId)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*displays menu table details */}
      <div
        id="menuitems"
        className={`tabcontent ${activeTab === "MENU" ? "active" : ""}`}
      >
        <button className="addnew_btn" onClick={toggleModalMenu}>
          <b>
            <span className="addnew_text">ADD NEW MENU</span>
          </b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_menu">
          <div className="menu_table">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getMenuList.map((menulist) => (
                  <tr key={menulist.id}>
                    <td>{menulist.id}</td>
                    <td style={{ TextAlign: "center" }}>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${menulist.menuimage}`}
                        className="categoryImage"
                        alt={menulist.name}
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    </td>
                    <td>{menulist.name}</td>
                    <td>{menulist.category}</td>
                    <td>{menulist.description}</td>
                    <td>${menulist.price}</td>
                    <td>
                      <FaEdit
                        className="editmenu_icon"
                        onClick={() => handleEditMenuItem(menulist)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <RiDeleteBin5Fill
                        className="deletemenu_icon"
                        onClick={() => handleDeleteMenu(menulist.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      </div>

      {/*displays Add New Category/Edit Category Popup functionality */}
      <Modal
        isOpen={isModalOpenCategory}
        onRequestClose={toggleModalCategory}
        contentLabel="Add New Category"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {selectedCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <button className="modal-close-button" onClick={toggleModalCategory}>
            <IoClose />
          </button>
        </div>
        <div className="add">
          <form className="flex-col" onSubmit={handleSubmitCategory}>
            <div className="add-category-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : categoryImage
                      ? `${process.env.REACT_APP_IMAGE_URL}${categoryImage}`
                      : upload_image
                  }
                  alt="categoryitem"
                />
              </label>
              <input
                onChange={(e) => {
                  setCategoryImage(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="image"
              />
              {errors.categoryImage && (
                <p className="error">{errors.categoryImage}</p>
              )}
            </div>
            <div className="add-category-name flex-col">
              <p>Category Name</p>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {errors.categoryName && (
                <p className="error">{errors.categoryName}</p>
              )}
            </div>
            <div className="add-category-description flex-col">
              <p>Category Description</p>
              <textarea
                name="description"
                placeholder="Write content here"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
              {errors.categoryDescription && (
                <p className="error">{errors.categoryDescription}</p>
              )}
            </div>
            <div className="category-buttons">
              <button type="submit" className="add-btn">
                {selectedCategory ? "UPDATE" : "ADD"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={toggleModalCategory}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/*displays Add New Menu/Edit Menu Popup functionality */}
      <Modal
        isOpen={isModalOpenMenu}
        onRequestClose={toggleModalMenu}
        contentLabel="Add New MenuItem"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {selectedMenuItem ? "Edit Menu" : "Add New Menu"}
          </h2>
          <button className="modal-close-button" onClick={toggleModalMenu}>
            <IoClose />
          </button>
        </div>
        <div className="add">
          <form className="flex-col" onSubmit={handleSubmitMenu}>
            <div className="add-menu-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : menuImage
                      ? `${process.env.REACT_APP_IMAGE_URL}${menuImage}`
                      : upload_image
                  }
                  alt="menuitem"
                />
              </label>
              <input
                onChange={(e) => {
                  setMenuImage(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="image"
              />
              {menuerrors.menuImage && (
                <p className="error">{menuerrors.menuImage}</p>
              )}
            </div>
            <div className="add-menu-name flex-col">
              <p>Product Name</p>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
              />
              {menuerrors.menuName && (
                <p className="error">{menuerrors.menuName}</p>
              )}
            </div>
            <div className="add-menu-description flex-col">
              <p>Product Description</p>
              <textarea
                name="description"
                placeholder="Write content here"
                value={menuDescription}
                onChange={(e) => setMenuDescription(e.target.value)}
              />
              {menuerrors.menuDescription && (
                <p className="error">{menuerrors.menuDescription}</p>
              )}
            </div>
            <div className="add-menucategory flex-col">
              <p>Product Category</p>
              <select
                name="category"
                value={menuCategory}
                onChange={(e) => setMenuCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {getCategoryList.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {menuerrors.menuCategory && (
                <p className="error">{menuerrors.menuCategory}</p>
              )}
            </div>
            <div className="add-menuprice flex-col">
              <p>Product Price</p>
              <input
                type="number"
                name="price"
                placeholder="$20"
                value={menuPrice}
                onChange={(e) => setMenuPrice(e.target.value)}
              />
              {menuerrors.menuPrice && (
                <p className="error">{menuerrors.menuPrice}</p>
              )}
            </div>
            <div className="menu-buttons">
              <button type="submit" className="add-btn">
                {selectedMenuItem ? "UPDATE" : "ADD"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={toggleModalMenu}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/*displays Delete Category Popup functionality */}
      <Modal
        isOpen={isDeleteCategoryModalOpen}
        onRequestClose={closeDeleteCategoryModal}
        contentLabel="Delete Category"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Delete Category</h2>
          <button
            className="modal-close-button"
            onClick={closeDeleteCategoryModal}
          >
            <IoClose />
          </button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this category?</p>
          <br/>
          <div className="delete-buttons">
            <button
              className="delete-btn"
              onClick={() =>
                handleConfirmDelete(selectedCategoryToDelete.categoryId)
              }
            >
              Delete
            </button>&nbsp;
            <button className="cancel-btn" onClick={closeDeleteCategoryModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/*displays Delete Menu Popup functionality */}
      <Modal
        isOpen={isDeleteMenuModalOpen}
        onRequestClose={closeDeleteMenuModal}
        contentLabel="Delete Menu"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Delete Menu</h2>
          <button className="modal-close-button" onClick={closeDeleteMenuModal}>
            <IoClose />
          </button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this menu?</p>
          <br/>
          <div className="delete-buttons">
            <button
              className="delete-btn"
              onClick={() =>
                handleConfirmDeleteMenu(selectedMenuToDelete.id)
              }
            >
              Delete
            </button>&nbsp;
            <button className="cancel-btn" onClick={closeDeleteMenuModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};