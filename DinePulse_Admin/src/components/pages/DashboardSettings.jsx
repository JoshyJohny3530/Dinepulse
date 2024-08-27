import React, { useState, useEffect } from "react";
import axios from "axios";

export const DashboardSettings = () => {
  const [shopDetails, setShopDetails] = useState({
    shopId: "",
    shopName: "",
    shopEmail: "",
    shopPhoneNumber: "",
    shopAddress: "",
    taxRate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDetails, setTempDetails] = useState({ ...shopDetails });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "ShopConfig/GetShopDetails")
      .then((response) => {
        const data = JSON.parse(response.data.data)[0]; // Parse JSON data from response
        setShopDetails({
          shopId: data.shop_id,
          shopName: data.shop_name,
          shopEmail: data.shop_email,
          shopPhoneNumber: data.shop_phone_number,
          shopAddress: data.shop_address,
          taxRate: data.tax_rate,
        });
      })
      .catch((error) => {
        console.error("Error fetching shop details:", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempDetails({ ...shopDetails });
  };

  const handleSaveClick = () => {
    axios
      .put(process.env.REACT_APP_API_URL + "ShopConfig/UpdateShopDetails", {
        shopId: shopDetails.shopId,
        shopName: tempDetails.shopName,
        shopEmail: tempDetails.shopEmail,
        shopPhoneNumber: tempDetails.shopPhoneNumber,
        shopAddress: tempDetails.shopAddress,
        taxRate: tempDetails.taxRate,
      })
      .then((response) => {
        console.log("Shop details updated successfully:", response.data);
        setShopDetails({ ...tempDetails }); // Update shop details in state
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating shop details:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempDetails({ ...tempDetails, [name]: value });
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "dark-overlay") {
      handleClosePopup();
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>SETTINGS</h3>
      </div>
      <div className="section_settings">
        <div className="formbox settings">
          <form action="">
            <br />
            <div className="setinputbox">
              <label className="label_name">Shop ID: </label>
              <label>{shopDetails.shopId}</label>
            </div>
            <div className="setinputbox">
              <label className="label_name">Shop Name: </label>
              <label>{shopDetails.shopName}</label>
            </div>
            <div className="setinputbox">
              <label className="label_name">Email: </label>
              <label>{shopDetails.shopEmail}</label>
            </div>
            <div className="setinputbox">
              <label className="label_name">Phone Number: </label>
              <label>{shopDetails.shopPhoneNumber}</label>
            </div>
            <div className="setinputbox">
              <label className="label_name">Address: </label>
              <label>{shopDetails.shopAddress}</label>
            </div>
            <div className="setinputbox">
              <label className="label_name">Tax Rate: </label>
              <label>{shopDetails.taxRate}</label>
            </div>
          </form>
        </div>
        <button className="setting_button" onClick={handleEditClick}>
          UPDATE
        </button>
      </div>

      {isEditing && (
        <>
          <div className="overlay dark-overlay" onClick={handleOverlayClick}></div>
          <div className="edit-popup">
            <div className="setting-close" onClick={handleClosePopup}>
              ✖
            </div>
            <div className="settings-popup-content">
              <h3>Edit Shop Details</h3>
              <form>
                <div className="setinputbox">
                  <label className="label_name">Shop Name: </label>
                  <input
                    type="text"
                    name="shopName"
                    value={tempDetails.shopName}
                    onChange={handleChange}
                  />
                </div>
                <div className="setinputbox">
                  <label className="label_name">Email: </label>
                  <input
                    type="email"
                    name="shopEmail"
                    value={tempDetails.shopEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="setinputbox">
                  <label className="label_name">Phone Number: </label>
                  <input
                    type="text"
                    name="shopPhoneNumber"
                    value={tempDetails.shopPhoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="setinputbox">
                  <label className="label_name">Address: </label>
                  <input
                    type="text"
                    name="shopAddress"
                    value={tempDetails.shopAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="setinputbox">
                  <label className="label_name">Tax Rate: </label>
                  <input
                    type="text"
                    name="taxRate"
                    value={tempDetails.taxRate}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" onClick={handleSaveClick}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
