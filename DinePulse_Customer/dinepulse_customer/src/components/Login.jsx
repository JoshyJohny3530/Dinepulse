import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import registerImage from "../assets/register_image.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "./AuthenticationHandler";
import { IoMdEyeOff, IoMdEye } from "react-icons/io"; 
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs"; 

//set the app element for accessibility
Modal.setAppElement("#root");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation
    if (!username) {
      formIsValid = false;
      errors.username = "Username cannot be empty!!!";
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
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
      let data = JSON.stringify({
        userName: username,
        userPassword: password,
      });
      const API_URL =
        process.env.REACT_APP_API_URL + "CustomerLogin/LoginCustomer";
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
          const user = response.data;
          login(user);
          localStorage.setItem('customerName', response.data.displayName);
          localStorage.setItem('customerID', response.data.userID);
          navigate("/menu");
        })
        .catch((error) => {
          alert("Invalid Login Credentials!!!");
          console.log(error);
        });
    }
  };

  const [isModalOpenResetPassword, setIsModalOpenResetPassword] =
    useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [resetPasswordErrors, setResetPasswordErrors] = useState({});

  const toggleModalResetPassword = () => {
    if (isModalOpenResetPassword) {
      setUserName("");
      setResetPasswordErrors({});
    } else {
      setResetPasswordErrors({});
    }
    setIsModalOpenResetPassword(!isModalOpenResetPassword);
  };

  const validateResetPasswordForm = () => {
    const resetPasswordErrors = {};
    if (!userName.trim()) {
      resetPasswordErrors.userName = "UserName is required.";
    }
    return resetPasswordErrors;
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();

    const resetPasswordErrors = validateResetPasswordForm();
    if (Object.keys(resetPasswordErrors).length > 0) {
      setResetPasswordErrors(resetPasswordErrors);
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={registerImage} alt="Register" />
      </div>
      <div className="right-section">
        <h2>LOGIN HERE...</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUserAlt className="icons" />
          </div>
          {errors.username && <span className="error">{errors.username}</span>}
          <div className="input-group">
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
          {errors.password && <span className="error">{errors.password}</span>}
          <div className="remember_forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" onClick={toggleModalResetPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn-login">
            LOGIN
          </button>
        </form>
        <Link to="/register" className="register-link">
          NEW USER? REGISTER HERE
        </Link>
      </div>
      <Modal
        isOpen={isModalOpenResetPassword}
        onRequestClose={toggleModalResetPassword}
        contentLabel="Reset Password"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Reset Password</h2>
          <div className="modal-close-button" onClick={toggleModalResetPassword}>
            <IoClose />
          </div>
        </div>
        <div className="add">
          <form className="flex-col" onSubmit={handleSubmitResetPassword}>
            <div className="add-employee-password flex-col">
              <label>Enter Username</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Username here"
                onChange={(e) => setUserName(e.target.value)}
              />
              {resetPasswordErrors.userName && (
                <p className="error">{resetPasswordErrors.userName}</p>
              )}
            </div>
            <div className="employee-buttons">
              <button type="submit" className="password-btn">
                Search
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
