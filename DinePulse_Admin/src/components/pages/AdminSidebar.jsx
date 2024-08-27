import React from "react";
import restaurant_logo from "../Assets/restaurant_logo.png";
import { MdSpaceDashboard, MdTableRestaurant } from "react-icons/md";
import {
  IoFastFood,
  IoRestaurant,
  IoReceipt,
  IoSettings,
} from "react-icons/io5";
import { RiReservedFill } from "react-icons/ri";
import { FaShoppingCart, FaChartBar, FaMailchimp } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";
export const AdminSidebar = () => {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <img
          src={restaurant_logo}
          alt="Dinepulse logo"
          className="sidebar-logo"
        />
        <h1 className="restaurant-name">DINEPULSE</h1>
      </div>
      <ul className="sidebar-list">
        <Link to="/dashboard">
          <li className="sidebar-list-item">
            <MdSpaceDashboard className="dashboardicons" /> &nbsp;&nbsp;Overview
          </li>
        </Link>
        <Link to="/products">
          <li className="sidebar-list-item">
            <IoRestaurant className="dashboardicons" /> &nbsp;&nbsp;Products
          </li>
        </Link>
        <Link to="/tables">
          <li className="sidebar-list-item">
            <MdTableRestaurant className="dashboardicons" /> &nbsp;&nbsp;Tables
          </li>
        </Link>
        <Link to="/reservations">
          <li className="sidebar-list-item">
            <RiReservedFill className="dashboardicons" />{" "}
            &nbsp;&nbsp;Reservation
          </li>
        </Link>
        <Link to="/employees">
          <li className="sidebar-list-item">
            <BsPeopleFill className="dashboardicons" /> &nbsp;&nbsp;Employees
          </li>
        </Link>
        <Link to="/takeorders">
          <li className="sidebar-list-item">
            <IoFastFood className="dashboardicons" /> &nbsp;&nbsp;Take Orders
          </li>
        </Link>
        <Link to="/orders">
          <li className="sidebar-list-item">
            <FaShoppingCart className="dashboardicons" /> &nbsp;&nbsp;Orders
          </li>
        </Link>
        <Link to="/kitchen">
          <li className="sidebar-list-item">
            <GrRestaurant className="dashboardicons" /> &nbsp;&nbsp;Kitchen
          </li>
        </Link>
        <Link to="/receipts">
          <li className="sidebar-list-item">
            <IoReceipt className="dashboardicons" /> &nbsp;&nbsp;Receipts
          </li>
        </Link>
        <Link to="/reports">
          <li className="sidebar-list-item">
            <FaChartBar className="dashboardicons" /> &nbsp;&nbsp;Reports
          </li>
        </Link>
        <Link to="/usermessages">
          <li className="sidebar-list-item">
            <FaRegMessage className="dashboardicons" /> &nbsp;&nbsp;User
            Messages
          </li>
        </Link>
        <Link to="/settings">
          <li className="sidebar-list-item">
            <IoSettings className="dashboardicons" /> &nbsp;&nbsp;Settings
          </li>
        </Link>
      </ul>
    </aside>
  );
};
