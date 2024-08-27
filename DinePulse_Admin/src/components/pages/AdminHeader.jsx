import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import {
  FaSignOutAlt,
  FaUtensils,
  FaShoppingBag,
  FaPauseCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthenticationHandler";
export const AdminHeader = ({ showHeaderLeft }) => {
  const navigate = useNavigate();
  const { logout,userName  } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle Dine-In/Take-Away, On-Hold actions button click
  const handleAction = (action) => {
    console.log(`${action} button clicked`);
    navigate("/takeorders", { state: { action } });
  };

  return (
    <header className="header">
      <div className="header-left" style={{ marginLeft: 260 }}>
        {showHeaderLeft && (
          <div className="header-buttons">
            <button onClick={() => handleAction("On-Hold")}>
              <FaPauseCircle className="button-icon" />
              On Hold
            </button>
            <button onClick={() => handleAction("Take-Away")}>
              <FaShoppingBag className="button-icon" />
              Takeout
            </button>
            <button onClick={() => handleAction("Dine-In")}>
              <FaUtensils className="button-icon" />
              Dine-In
            </button>
          </div>
        )}
      </div>

      <div className="header-right">
        <BsPersonCircle className="profile_icon" />
        <b>
          <span className="profile_text">{userName}</span>
        </b>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FaSignOutAlt className="icon_logout" onClick={handleLogout} />
      </div>
    </header>
  );
};
