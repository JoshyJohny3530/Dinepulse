import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";
import restaurantLogo from "../assets/restaurant_logo.png";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "./AuthenticationHandler";

const Header = () => {
  const navigate = useNavigate();
  const { logout,isLoggedIn,userName } = useAuth();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userID, setUserID] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const loginname = localStorage.getItem('customerName');

  return (
    <header className="header">
      <div
        className={`overlay ${isMobileMenuOpen ? "overlay-show" : ""}`}
        onClick={toggleMobileMenu}
      ></div>
      <div className="logo">
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img src={restaurantLogo} alt="Dine Pulse" />
          <span>DINE PULSE</span>
        </Link>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/menu">MENU</Link>
          </li>
          <li>
            <Link to="/cart">CART</Link>
          </li>
          <li>
            <Link to="/gallery">GALLERY</Link>
          </li>
          <li>
            <Link to="/aboutus">ABOUT US</Link>
          </li>
          {isLoggedIn ?
          (
          <li>
            <BsPersonCircle className="profile_icon" />
            <b>
              <span className="profile_text">{userName}</span>
            </b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FaSignOutAlt className="icon_logout" onClick={handleLogout} />
          </li>
        ) : (
          <li>
            <button onClick={() => navigate("/login")} aria-label="Login">
              LOGIN
            </button>
          </li>
          )}
        </ul>
      </nav>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <FaBars />
      </div>
      <div
        className={`mobile-nav ${isMobileMenuOpen ? "mobile-nav-open" : ""}`}
      >
        <div className="mobile-nav-header">
          <Link to="/" onClick={toggleMobileMenu}>
            <img src={restaurantLogo} alt="Dine Pulse" />
            <span>DINE PULSE</span>
          </Link>
          <FaTimes onClick={toggleMobileMenu} className="closeicon"/>
        </div>
        <ul>
          <li>
            <Link to="/" onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={toggleMobileMenu}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMobileMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/aboutus" onClick={toggleMobileMenu}>
              About Us
            </Link>
          </li>
          {isLoggedIn ?
          (
            <li>
            <BsPersonCircle className="profile_icon" />
            <b>
              <span className="profile_text">{userName}</span>
            </b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FaSignOutAlt className="icon_logout" onClick={handleLogout} />
          </li>
         ) : (
          <li>
            <button onClick={() => navigate("/login")} aria-label="Login">
              LOGIN
            </button>
          </li>
          )}    
        </ul>
      </div>
    </header>
  );
};

export default Header;