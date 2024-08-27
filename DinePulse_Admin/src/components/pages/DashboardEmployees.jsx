import React, { useState, useEffect } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from 'react-modal';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import bcrypt from 'bcryptjs';

// Set the app element for accessibility
Modal.setAppElement('#root');

export const DashboardEmployees = () => {

  //state for employee list
  const [getEmployeeList, setEmployeeList] = useState([]);
  const [isModalOpenEmployee, setIsModalOpenEmployee] = useState(false);

  //state for selected employee item : for inserting new or editing one
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  //state for employee input fields
  //const [employeeimage, setEmployeeImage] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [message, setMessage] = useState("");

  //state for employee inputs validation errors
  const [employeeerrors, setEmployeeErrors] = useState({});

  const toggleModalEmployee = () => {
    if (isModalOpenEmployee) {
      setSelectedEmployee(null);
      setEmployeeName("");
      setEmployeePassword("");
      setEmployeeType("");
      setEmployeeStatus(null);
      //setEmployeeImage(null);
      setEmployeeErrors({}); //clear errors when closing the modal
    } else {
      setEmployeeErrors({}); //clear errors when opening the modal
    }
    setIsModalOpenEmployee(!isModalOpenEmployee);
  };

  //fetch employee details from table
  const fetchEmployees = async () => {
    const API_URL = process.env.REACT_APP_API_URL+'Login/GetUsers'
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {}
    };

    try {
      const response = await axios.request(config);
      console.log('Response Data:', response.data);
      const data = JSON.parse(response.data.data);
      setEmployeeList(data);
    } catch (error) {
      console.error("Caught error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  //function to validate employee form inputs
  const validateEmployeeForm = () => {
    const employeeerrors = {};
    if (!employeeName.trim()) {
      employeeerrors.employeeName = "Employee Name is required.";
    }
    if (!employeePassword.trim()) {
      employeeerrors.employeePassword = "Employee Password is required.";
    }
    if (!employeeType.trim()) {
      employeeerrors.employeeType = "Employee Type is required.";
    }
    if (!employeeStatus.trim()) {
      employeeerrors.employeeStatus = "Employee Status is required.";
    }
    /*if (!employeeImage && !selectedEmployee) {
      employeeerrors.employeeImage = "Employee Image is required.";
      employeeerrors.employeeImage = "";
    }*/
    return employeeerrors;
  };

  async function hashPasswod(password) {
    let encryptpassword = await bcrypt.hash(password, 10);
    return encryptpassword;
  }
  
  //popup insert and update functionality of employees
  const handleSubmitEmployees = async (e) => {
    e.preventDefault();

    const employeeerrors = validateEmployeeForm();
    if (Object.keys(employeeerrors).length > 0) {
      setEmployeeErrors(employeeerrors);
      return;
    }

    /*const formData = new FormData();
    formData.append("userName", employeeName);
    formData.append("userPassword", employeePassword);
    formData.append("userType", employeeType);
    //formData.append("categoryModel.CategoryDescription", employeeStatus);
    
    if (selectedEmployee) {
      formData.append("userId", selectedEmployee.user_id);
      formData.append("userStatus", selectedEmployee.user_status);
    }

    console.log("employee userName ==> "+employeeName);
    console.log("employee userPassword ==> "+employeePassword);
    console.log("employee userType ==> "+employeeType);
    console.log("employee userStatus ==> "+selectedEmployee.user_status);
    console.log("employee userId ==> "+selectedEmployee.user_id);*/

    try {
      const url = selectedEmployee
        ? `${process.env.REACT_APP_API_URL}Login/EditUser`
        : `${process.env.REACT_APP_API_URL}Login/AddUser`;

      const method = selectedEmployee ? "put" : "post";

      let data = "";

      if (!selectedEmployee) {
        data = JSON.stringify({
          "userName": employeeName,
          "userPassword": await hashPasswod(employeePassword),
          "userType":employeeType,
        });
      }
      else {
        data = JSON.stringify({
          "userName": employeeName,
          "userPassword": await hashPasswod(employeePassword),
          "userType":employeeType,
          "userId": selectedEmployee.user_id,
          "userStatus": selectedEmployee.user_status
        });
      }
      

      const response = await axios({
        method,
        url,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage(
          selectedEmployee
            ? "Employee updated successfully."
            : "Employee inserted successfully."
        );
        setIsModalOpenEmployee(false);
        setEmployeeName("");
        setEmployeePassword("");
        setEmployeeType("");
        //setEmployeeImage(null);
        setEmployeeStatus("");
        setSelectedEmployee(null);
        fetchEmployees();
      } else {
        setMessage("Failed to save employee.");
      }
    } catch (error) {
      console.error("Error saving employee", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //function to handle editing a employee item
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeName(employee.user_name);
    setEmployeePassword(employee.user_password);
    setEmployeeType(employee.user_type);
    //setCategoryImage(null);
    setEmployeeStatus(employee.user_status);    //user_id  user_name user_type user_status
    setEmployeeErrors({}); //clear errors when opening the modal
    toggleModalEmployee();
  };

  //handle the category delete functionality
  const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] = useState(null);
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] = useState(false);

   //function to open the empployee delete modal
   const openDeleteEmployeeModal = (employee) => {
    setSelectedEmployeeToDelete(employee);
    setIsDeleteEmployeeModalOpen(true);
  };

  //function to close the Employee delete modal
  const closeDeleteEmployeeModal = () => {
    setSelectedEmployeeToDelete(null);
    setIsDeleteEmployeeModalOpen(false);
  };

  //modify the handleDeleteEmployee function to directly open the delete modal
  const handleDeleteEmployee = (employeeId) => {
    const employeeToDelete = getEmployeeList.find(
      (employee) => employee.user_id === employeeId
    );
    openDeleteEmployeeModal(employeeToDelete);
  };

  const handleConfirmDelete = async (employeeId) => {
    console.log("delete id : " + employeeId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}Login/DeleteUser?userId=${employeeId}`
      );
      if (response.status === 200) {
        setMessage("Employee deleted successfully.");
        setEmployeeList(
          getEmployeeList.filter(
            (employee) => employee.user_id !== employeeId
          )
        );
        setIsDeleteEmployeeModalOpen(false);
      } else {
        setMessage("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Error deleting employee", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>EMPLOYEE DETAILS</h3>
      </div>
      <br />
      <br />

      <div id="employees" className="employees">
        <button className="addnew_btn" onClick={toggleModalEmployee}>
          <b>
            <span className="addnew_text">ADD NEW EMPLOYEE</span>
          </b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_employees">
          <div className="employees_table">
            <table>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Staff Name</th>
                  <th>Staff Type</th>
                  <th>Registered Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getEmployeeList.map((employeelist) => (
                    <tr key={employeelist.user_id}>
                        <td>{employeelist.user_id}</td>
                        <td>{employeelist.user_name}</td> 
                        <td>{employeelist.user_type}</td>
                        <td>{employeelist.user_registered_date}</td>
                        <td>{employeelist.user_status}</td>
                        <td>
                            <FaEdit className='editemployee_icon' onClick={() => handleEditEmployee(employeelist)} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <RiDeleteBin5Fill className='deleteemployee_icon' onClick={() => handleDeleteEmployee(employeelist.user_id)}/>
                        </td>
                    </tr>
                  ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpenEmployee} onRequestClose={toggleModalEmployee} contentLabel="Add New Employee"
        className="modal" overlayClassName="modal-overlay">
            <div className="modal-header">
                <h2 className='modal-title'> {selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>
                <button className="modal-close-button" onClick={toggleModalEmployee}>
                    <IoClose />
                </button>
            </div>
            <div className='add'>
                <form className='flex-col' onSubmit={handleSubmitEmployees}>
                    <div className='add-employee-name flex-col'>
                        <p>Employee Name</p>
                        <input type='text' name='name' placeholder='Type here' value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value)}/>
                        {employeeerrors.employeeName && <p className="error">{employeeerrors.employeeName}</p>}
                    </div>
                    <div className='add-employee-password flex-col'>
                        <p>Employee Password</p>
                        <input type='text' name='name' placeholder='Type here'
                          onChange={(e) => setEmployeePassword(e.target.value)}/>
                        {employeeerrors.employeePassword && <p className="error">{employeeerrors.employeePassword}</p>}
                    </div>
                    <div className='add-employee-type flex-col'>
                        <p>Employee Type</p>
                        <select name='employeetype' value={employeeType}
                          onChange={(e) => setEmployeeType(e.target.value)}>
                            <option value="">Select employee type</option>
                            <option value="kitchen">kitchen</option>
                            <option value="admin">admin</option>
                            <option value="cashier">cashier</option>
                            <option value="waiter">waiter</option>
                        </select>
                        {employeeerrors.employeeType && <p className="error">{employeeerrors.employeeType}</p>}
                    </div>
                    <div className='add-employee-status flex-col'>
                        <p>Employee Status</p>
                        <select name='employeestatus' value={employeeStatus}
                          onChange={(e) => setEmployeeStatus(e.target.value)}>
                            <option value="">Select employee status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {employeeerrors.employeeStatus && <p className="error">{employeeerrors.employeeStatus}</p>}
                    </div>
                    <div className='employee-buttons'>
                        <button type="submit" className="add-btn">{selectedEmployee ? "UPDATE" : "ADD"}</button>
                        <button type='button' className='cancel-btn' onClick={toggleModalEmployee}>CANCEL</button>
                    </div>
                </form>
            </div>
      </Modal>

      <Modal
        isOpen={isDeleteEmployeeModalOpen}
        onRequestClose={closeDeleteEmployeeModal}
        contentLabel="Delete Employee"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Delete Employee</h2>
          <button className="modal-close-button" onClick={closeDeleteEmployeeModal}>
            <IoClose />
          </button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this employee?</p>
          <br/>
          <div className="delete-buttons">
            <button
              className="delete-btn"
              onClick={() =>
                handleConfirmDelete(selectedEmployeeToDelete.user_id)
              }
            >
              Delete
            </button>&nbsp;
            <button className="cancel-btn" onClick={closeDeleteEmployeeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

    </main>
  );
};
