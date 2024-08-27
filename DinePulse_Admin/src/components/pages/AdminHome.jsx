import React, { useState } from "react";
import "../css/AdminDashboardStyles.css";
import { FaUserAlt } from "react-icons/fa";
import restaurant_logo from "../Assets/restaurant_logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notify from "../utils/ToastNotifications";
import { useAuth } from "../utils/AuthenticationHandler";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs"; 

export const AdminHome = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation
    if (!username) {
      formIsValid = false;
      errors.username = "Username cannot be empty!!!";
    }

    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      formIsValid = false;
      errors.password = "Password must be at least 8 characters long!!";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, proceed with API call
      let data = JSON.stringify({
        userName: username,
        userPassword: password,
      });
      const API_URL = process.env.REACT_APP_API_URL + "Login/LoginUser";
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          //console.log(JSON.stringify(response.data));
          const user = response.data;
          login(user);
          navigate("/dashboard");
          Notify("Login Success!!!");
        })
        .catch((error) => {
          alert("Invalid Login Credentials!!!");
          console.log("Caught error while logging in: ", error);
        });
    }
  };

  return (
    <div className="admin-background">
      <div className="header_outer">
        <div className="content_outer">
          <div className="header_content">
            <img src={restaurant_logo} alt="Dinepulse logo" />
            <h1>DINEPULSE</h1>
          </div>
          <div className="description_content">
            <h2 className="description">
              Effectively oversee restaurant operations through our
              comprehensive dashboard. Monitor orders, handle reservations,
              analyze sales data, and manage inventory—all from one convenient
              location!
            </h2>
          </div>
          <div className="section_login">
            <div className="formbox login">
              <form onSubmit={handleSubmit}>
                <h1>Login here...</h1>
                <br />
                <div className="inputitems">
                  <input
                    type="text"
                    placeholder="Username"
                    id="user_name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FaUserAlt className="icons" />
                </div>
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
                <div className="inputitems">
                  <input
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <BsFillEyeFill
                      className="icons"
                      onClick={() => setShowPassword(false)} 
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      className="icons"
                      onClick={() => setShowPassword(true)} 
                    />
                  )}

                  
                </div>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
                <div className="remember_forgot">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button type="submit">LOGIN</button>
                <div className="register_link">
                  <p>
                    Don't have an account?{" "}
                    <a href="#" onClick={() => navigate("/adminregister")}>
                      REGISTER
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
