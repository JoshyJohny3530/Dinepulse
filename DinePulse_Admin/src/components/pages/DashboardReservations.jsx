import React, { useState, useEffect } from "react";
import free_table from "../Assets/free_table.png";
import reserved_table from "../Assets/reserved_table.png";
import { BsTable } from "react-icons/bs";
import { MdAddToPhotos } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from "react-modal";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import * as signalR from "@microsoft/signalr";
import Notify from "../utils/ToastNotifications";
import { useAuth } from "../utils/AuthenticationHandler";
// Set the app element for accessibility
Modal.setAppElement("#root");

export const DashboardReservations = () => {
  //state for reservation list
  const [getReservationList, setReservationList] = useState([]);
  const [isModalOpenReservation, setIsModalOpenReservation] = useState(false);

  //state for selected reservation details : for inserting new or editing one
  const [selectedReservation, setSelectedReservation] = useState(null);

  //state for reservation input fields
  const [noofGuests, setNoofGuests] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationSuggestions, setReservationSuggestions] = useState("");
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  //state for reservation inputs validation errors
  const [reservationerrors, setReservationErrors] = useState({});
  const { isLoggedIn } = useAuth();
  const toggleModalReservation = () => {
    if (isModalOpenReservation) {
      setSelectedReservation(null);
      setNoofGuests("");
      setReservationEmail("");
      setReservationPhone("");
      setReservationDate(null);
      setReservationTime(null);
      setReservationSuggestions(null);
      setReservationErrors({}); //clear errors when closing the modal
    } else {
      setReservationErrors({}); //clear errors when opening the modal
    }
    setIsModalOpenReservation(!isModalOpenReservation);
  };

  //fetch Reservation details from table
  const fetchReservation = async () => {
    const API_URL =
      process.env.REACT_APP_API_URL + "TableReservation/GetReservations";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      console.log("Response Data:", response.data);
      const data = JSON.parse(response.data.data);
      setReservationList(data);
    } catch (error) {
      console.error("Caught error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${process.env.REACT_APP_API_ROOT_URL}AdminNotificationHub`
      )
      .build();

    setConnection(newConnection);

    newConnection.on("CustomerTableReserved", (reservation) => {
      fetchReservation();
      //Notify("New Table Reservation Request Received!!!");
    });

    newConnection
      .start()
      .catch((err) => console.error("SignalR Connection Error: ", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  //function to validate reservation form inputs
  const validateReservationForm = () => {
    const reservationerrors = {};
    if (!noofGuests.trim()) {
      reservationerrors.noofGuests = "No.of Guests is required.";
    }
    if (!reservationEmail.trim()) {
      reservationerrors.reservationEmail = "Reservation Email is required.";
    }
    if (!reservationPhone.trim()) {
      reservationerrors.reservationPhone = "Contact Number is required.";
    }
    if (!reservationDate.trim()) {
      reservationerrors.reservationDate = "Reservation Date is required.";
    }
    if (!reservationTime.trim()) {
      reservationerrors.reservationTime = "Reservation Time is required.";
    }
    if (!reservationSuggestions.trim()) {
      reservationerrors.reservationSuggestions = "Suggestions is required.";
    }
    return reservationerrors;
  };

  //popup insert and update functionality of reservation
  const handleSubmitReservation = async (e) => {
    e.preventDefault();

    const reservationerrors = validateReservationForm();
    if (Object.keys(reservationerrors).length > 0) {
      setReservationErrors(reservationerrors);
      return;
    }

    const formData = new FormData();
    formData.append("userName", noofGuests);
    formData.append("userPassword", reservationEmail);
    formData.append("userType", reservationPhone);
    formData.append("userName", reservationDate);
    formData.append("userPassword", reservationTime);
    formData.append("userType", reservationSuggestions);

    if (selectedReservation) {
      formData.append("userId", selectedReservation.user_id);
    }

    try {
      const url = selectedReservation
        ? `${process.env.REACT_APP_API_URL}Login/EditUser`
        : `${process.env.REACT_APP_API_URL}Login/AddUser`;

      const method = selectedReservation ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage(
          selectedReservation
            ? "Reservation Details updated successfully."
            : "Reservation Details inserted successfully."
        );
        setIsModalOpenReservation(false);
        setNoofGuests("");
        setReservationEmail("");
        setReservationPhone("");
        setReservationDate("");
        setReservationTime("");
        setReservationSuggestions("");
        setSelectedReservation(null);
        fetchReservation();
      } else {
        setMessage("Failed to save Reservation Details.");
      }
    } catch (error) {
      console.error("Error saving Reservation Details", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //function to handle editing a reservation item
  const handleEditReservation = (reservation) => {
    setSelectedReservation(reservation);
    setNoofGuests(reservation.user_name);
    setReservationEmail(reservation.user_password);
    setReservationPhone(reservation.user_type);
    setReservationDate(reservation.user_name);
    setReservationTime(reservation.user_password);
    setReservationSuggestions(reservation.user_type);
    setReservationErrors({}); //clear errors when opening the modal
    toggleModalReservation();
  };

  //handle the reservation delete functionality
  const [selectedReservationToDelete, setSelectedReservationToDelete] =
    useState(null);
  const [isDeleteReservationModalOpen, setIsDeleteReservationModalOpen] =
    useState(false);

  //function to open the reservation delete modal
  const openDeleteReservationModal = (reservation) => {
    setSelectedReservationToDelete(reservation);
    setIsDeleteReservationModalOpen(true);
  };

  //function to close the reservation delete modal
  const closeDeleteReservationModal = () => {
    setSelectedReservationToDelete(null);
    setIsDeleteReservationModalOpen(false);
  };

  //modify the handleDeleteReservation function to directly open the delete modal
  const handleDeleteReservation = (reservationId) => {
    const reservationToDelete = getReservationList.find(
      (reservation) => reservation.reservation_id === reservationId
    );
    openDeleteReservationModal(reservationToDelete);
  };

  const handleConfirmDelete = async (reservationId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}TableReservation/DeleteReservation/${reservationId}`
      );
      if (response.status === 200) {
        alert("Reservation Cancelled successfully.");
        setReservationList(
          getReservationList.filter(
            (reservation) => reservation.reservation_id !== reservationId
          )
        );
        setIsDeleteReservationModalOpen(false);
      } else {
        setMessage("Failed to delete Reservation.");
      }
    } catch (error) {
      console.error("Error deleting Reservation", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>RESERVATIONS</h3>
      </div>
      <br />
      <br />

      <div id="reservations" className="reservations">
        <button className="addnew_btn" onClick={toggleModalReservation}>
          <b>
            <span className="addnew_text">ADD NEW RESERVATION</span>
          </b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_reservations">
          <div className="reservation_table">
            <table>
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>No.of Guests</th>
                  <th>Email ID</th>
                  <th>Contact Number</th>
                  <th>Reservation Date</th>
                  <th>Reservation Time</th>
                  <th>Suggestions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getReservationList.length > 0 ? (
                  getReservationList.map((reservationlist) => (
                    <tr key={reservationlist.user_id}>
                      <td>{reservationlist.reservation_id}</td>
                      <td>{reservationlist.guest_count}</td>
                      <td>{reservationlist.customer_email}</td>
                      <td>{reservationlist.customer_phone}</td>
                      <td>{reservationlist.reservation_date}</td>
                      <td>{reservationlist.reservation_time}</td>
                      <td>{reservationlist.customer_suggestion}</td>
                      <td>
                        <FaEdit
                          className="editreservation_icon"
                          onClick={() => handleEditReservation(reservationlist)}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <RiDeleteBin5Fill
                          className="deletereservation_icon"
                          onClick={() =>
                            handleDeleteReservation(
                              reservationlist.reservation_id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        fontSize: "17px",
                        color: "#bb521f",
                        backgroundColor: "#ffe5d7",
                        textAlign: "center",
                      }}
                    >
                      No reservations to retrieve!!!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpenReservation}
        onRequestClose={toggleModalReservation}
        contentLabel="Add New Reservation"
        className="reservation-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {" "}
            {selectedReservation ? "Edit Reservation" : "Add New Reservation"}
          </h2>
          <button
            className="modal-close-button"
            onClick={toggleModalReservation}
          >
            <IoClose />
          </button>
        </div>
        <div className="add">
          <div className="booktable_header">
            <BsTable className="booktable_icon" /> <h3> BOOK A TABLE </h3>
          </div>
          <div className="booktable_subheader">
            <h5> WE OFFER YOU THE BEST RESERVATION SERVICE!!!</h5>
          </div>
          <br />
          <form className="flex-col" onSubmit={handleSubmitReservation}>
            <div className="add-reservation-details flex-col">
              <p>No.of Guests</p>
              <input
                type="number"
                name="name"
                placeholder="Type here"
                value={noofGuests}
                onChange={(e) => setNoofGuests(e.target.value)}
              />
              {reservationerrors.noofGuests && (
                <p className="error">{reservationerrors.noofGuests}</p>
              )}
            </div>
            <div className="add-reservation-details flex-col">
              <p>Email ID</p>
              <input
                type="email"
                name="name"
                placeholder="Type here"
                value={reservationEmail}
                onChange={(e) => setReservationEmail(e.target.value)}
              />
              {reservationerrors.reservationEmail && (
                <p className="error">{reservationerrors.reservationEmail}</p>
              )}
            </div>
            <div className="add-reservation-details flex-col">
              <p>Contact number</p>
              <input
                type="tel"
                name="name"
                placeholder="Type here"
                value={reservationPhone}
                onChange={(e) => setReservationPhone(e.target.value)}
              />
              {reservationerrors.reservationPhone && (
                <p className="error">{reservationerrors.reservationPhone}</p>
              )}
            </div>
            <div className="add-reservation-details flex-col">
              <p>Reservation Date</p>
              <input
                type="date"
                name="name"
                placeholder="Type here"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
              />
              {reservationerrors.reservationDate && (
                <p className="error">{reservationerrors.reservationDate}</p>
              )}
            </div>
            <div className="add-reservation-details flex-col">
              <p>Reservation Time</p>
              <input
                type="time"
                name="name"
                placeholder="Type here"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
              />
              {reservationerrors.reservationTime && (
                <p className="error">{reservationerrors.reservationTime}</p>
              )}
            </div>
            <div className="add-reservation-details flex-col">
              <p>Suggestions</p>
              <textarea
                name="suggestions"
                placeholder="If no suggestions, enter NIL"
                value={reservationSuggestions}
                onChange={(e) => setReservationSuggestions(e.target.value)}
              ></textarea>
              {reservationerrors.reservationSuggestions && (
                <p className="error">
                  {reservationerrors.reservationSuggestions}
                </p>
              )}
            </div>

            <div className="reservation-buttons">
              <button type="submit" className="add-btn">
                {selectedReservation ? "UPDATE BOOKING" : "MAKE BOOKING"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={toggleModalReservation}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteReservationModalOpen}
        onRequestClose={closeDeleteReservationModal}
        contentLabel="Delete Reservation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Delete Reservation</h2>
          <button
            className="modal-close-button"
            onClick={closeDeleteReservationModal}
          >
            <IoClose />
          </button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this Reservation?</p>
          <br />
          <div className="delete-buttons">
            <button
              className="delete-btn"
              onClick={() =>
                handleConfirmDelete(selectedReservationToDelete.reservation_id)
              }
            >
              Delete
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="cancel-btn"
              onClick={closeDeleteReservationModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};
