import React, { useState } from "react";
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, phone, message });

    const data = {
        name: name,
        email: email,
        phoneNumber: phone,
        message: message,
      };

      const API_URL =
        process.env.REACT_APP_API_URL + "UserMessage/AddMessage";

      axios
        .post(API_URL, data)
        .then((response) => {
          console.log("Response data:", response.data);
          alert("Your Message Submitted successfully!!!");
          navigate("/");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        })
        .catch((error) => {
          alert(error.response.data);
          console.log("Error:", error);
        });

  };

  return (
    <div id="subfooter1">
      <h2>Contact Us</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write Message..."
          />
          <div id="form_btn">
            <button type="submit" className="send-message">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuickLinks = () => (
  <div id="subfooter2">
    <h2>Quick Links</h2>
    <nav>
      <a href="/" className="active">
        HOME
      </a>
      <a href="/menu">MENU</a>
      <a href="/gallery">GALLERY</a>
      <a href="/aboutus">ABOUT US</a>
    </nav>
  </div>
);

const FooterInfo = () => (
  <div id="subfooter3">
    <p id="logo_line">
    Savor the finest flavors at DinePulse<br/>Your ultimate dining destination.
    </p>
    <p>
      Mon-Fri: 10:00 am - 10:00 am
      <br />
      Sat-Sun: 8:00 am - 12:00 am
    </p>
    <p id="copyright">
      Copyright &copy; 2024 <b>DinePulse</b>
    </p>
  </div>
);

const Footer = () => (
  <footer>
    <ContactUs />
    <QuickLinks />
    <FooterInfo />
  </footer>
);

export default Footer;
