import React, { useState, useEffect } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from 'react-modal';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

// Set the app element for accessibility
Modal.setAppElement('#root');

export const DashboardTables = () => {
  const [activeTab, setActiveTab] = useState("TABLES");
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  //state for tables list
  const [getTableList, setTableList] = useState([]);
  const [isModalOpenTables, setIsModalOpenTables] = useState(false);
  //state for devices list
  const [getDevicesList, setDevicesList] = useState([]);
  const [isModalOpenDevices, setIsModalOpenDevices] = useState(false);

  //state for selected tables operation : insert new or updating one
  const [selectedTable, setSelectedTable] = useState(null);
  //state for selected device operation : insert new or updating one
  const [selectedDevice, setSelectedDevice] = useState(null);

  //state for displaying messages after operation
  const [message, setMessage] = useState("");

  //state for table input fields
  const [tableNumber, setTableNumber] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");
  const [tableStatus, setTableStatus] = useState("");

  //state for device input fields
  const [deviceImei, setDeviceImei] = useState("");
  const [deviceUserName, setDeviceUserName] = useState("");
  const [devicePassword, setDevicePassword] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [deviceUserID, setDeviceUserID] = useState("");
  /*const [deviceStatus, setDeviceStatus] = useState("");*/

  //state for users list
  const [getUsersList, setUsersList] = useState([]);

  //state for table inputs validation errors
  const [tableerrors, setTableErrors] = useState({});
  //state for device inputs validation errors
  const [deviceerrors, setDeviceErrors] = useState({});

  //open table popup
  const toggleModalTables = () => {
    if (isModalOpenTables) {
      setSelectedTable(null);
      setTableNumber("");
      setTableCapacity("");
      setTableStatus("");
      setTableErrors({}); //clear table errors when closing the modal
    } else {
      setTableErrors({}); 
    }
    setIsModalOpenTables(!isModalOpenTables);
  };

  //open device popup
  const toggleModalDevices = () => {
    if (isModalOpenDevices) {
      setSelectedDevice(null);
      setDeviceImei("");
      setDeviceUserName("");
      setDevicePassword("");
      setDeviceToken("");
      setDeviceUserID("");
      /*setDeviceStatus("");*/
      setDeviceErrors({});
    } else {
      setDeviceErrors({}); //clear device errors when opening the modal
    }
    setIsModalOpenDevices(!isModalOpenDevices);
  };

  //fetch table details from table
  const fetchTables = async () => {
    const API_URL = process.env.REACT_APP_API_URL+'Table/GetTables'
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {}
    };

    try {
      const response = await axios.request(config);
      const data = JSON.parse(response.data.data);
      setTableList(data);
    } catch (error) {
      console.error("Caught error while fetching GetTables:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  //fetch device details from table 
  const fetchDevices = async () => {
    const API_URL = process.env.REACT_APP_API_URL+'Device/GetDevices'
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {}
    };

    try {
      const response = await axios.request(config);
      const data = JSON.parse(response.data.data);
      setDevicesList(data);
    } catch (error) {
      console.error("Caught error while fetching GetDevices:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  //fetch User details to include User ID while adding/editing Device details
  const fetchUsers = async () => {
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
      setUsersList(data);
    } catch (error) {
      console.error("Caught error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //function to validate table form inputs
  const validateTableForm = () => {
    const tableerrors = {};
    if (!tableNumber.trim() || parseInt(tableNumber) === 0) {
      tableerrors.tableNumber = "Table Number is required.";
    }
    if (!tableCapacity.trim() || parseInt(tableCapacity) === 0) {
      tableerrors.tableCapacity = "Table Capacity is required.";
    }
    if (!tableStatus.trim()) {
      tableerrors.tableStatus = "Table Status is required.";
    }
    return tableerrors;
  };

  //function to validate Devices form inputs
  const validateDeviceForm = () => {
    const deviceerrors = {};
    if (!deviceImei.trim()) {
      deviceerrors.deviceImei = "Device IMEI is required.";
    }
    if (!deviceUserName.trim()) {
      deviceerrors.deviceUserName = "Device User Name is required.";
    }
    if (!devicePassword.trim()) {
      deviceerrors.devicePassword = "Device Password is required.";
    }
    if (!deviceToken.trim()) {
      deviceerrors.deviceToken = "Device Token is required.";
    }
    if (!deviceUserID.trim()) {
      deviceerrors.deviceUserID = "User ID is required.";
    }
    return deviceerrors;
  };

  //popup insert and update functionality of tables section
  const handleSubmitTables = async (e) => {
    e.preventDefault();

    const tableerrors = validateTableForm();
    if (Object.keys(tableerrors).length > 0) {
      setTableErrors(tableerrors);
      return;
    }

    const formData = new FormData();
    formData.append("tableNumber", parseInt(tableNumber));
    formData.append("tableCapacity", parseInt(tableCapacity));
    formData.append("tableStatus", tableStatus);

    if (selectedTable) {
      formData.append("tableId", selectedTable.table_id);
    }

    try {
      const url = selectedTable
        ? `${process.env.REACT_APP_API_URL}Table/UpdateTable`
        : `${process.env.REACT_APP_API_URL}Table/AddTable`;

      const method = selectedTable ? "put" : "post";

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
          selectedTable
            ? "Table updated successfully."
            : "Table inserted successfully."
        );
        setIsModalOpenTables(false);
        setTableNumber("");
        setTableCapacity("");
        setTableStatus(null);
        setSelectedTable(null);
        fetchTables();
      } else {
        setMessage("Failed to save cattableegory.");
      }
    } catch (error) {
      console.error("Error saving table", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //popup insert and update functionality of Devices section
  const handleSubmitDevices = async (e) => {
    e.preventDefault();

    const deviceerrors = validateDeviceForm();
    if (Object.keys(deviceerrors).length > 0) {
      setDeviceErrors(deviceerrors);
      return;
    }

    const formData = new FormData();
    formData.append("deviceId", deviceImei);
    formData.append("deviceUsername", deviceUserName);
    formData.append("devicePassword", devicePassword);
    formData.append("deviceToken", deviceToken);
    formData.append("userId", deviceUserID);

    try {
      const url = selectedDevice
        ? `${process.env.REACT_APP_API_URL}Device/UpdateDevice`
        : `${process.env.REACT_APP_API_URL}Device/AddDevice`;

      const method = selectedDevice ? "put" : "post";

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
          setSelectedDevice ? "Device updated successfully." : "Device inserted successfully."
        );
        
        setIsModalOpenDevices(false);
        setDeviceImei("");
        setDeviceUserName("");
        setDevicePassword("");
        setDeviceToken("");
        setDeviceUserID("");
        /*setDeviceStatus("");*/
        setSelectedDevice(null);
        fetchDevices();
      } else {
        setMessage("Failed to save device.");
      }
    } catch (error) {
      console.error("Error saving device", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //function to handle editing a table item
  const handleEditTableItem = (tableItem) => {
    setSelectedTable(tableItem);
    setTableNumber(tableItem.table_number);
    setTableCapacity(tableItem.table_capacity);
    setTableStatus(tableItem.table_status);
    setTableErrors({}); 
    toggleModalTables();
  };

  //function to handle editing a device item
  const handleEditDevice = (deviceItem) => {
    setSelectedDevice(deviceItem);
    setDeviceImei(deviceItem.device_id);
    setDeviceUserName(deviceItem.device_username);
    setDevicePassword(deviceItem.device_password);
    setDeviceToken(deviceItem.device_token);
    setDeviceUserID(deviceItem.user_id);
    /*setDeviceStatus(deviceItem.category);*/
    setDeviceErrors({});
    toggleModalDevices();
  };

  //handle the popup table delete functionality
  const [selectedTableToDelete, setSelectedTableToDelete] = useState(null);
  const [isDeleteTableModalOpen, setIsDeleteTableModalOpen] = useState(false);

  //handle the popup device delete functionality
  const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState(null);
  const [isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen] = useState(false);

  //function to open the table delete modal
  const openDeleteTableModal = (table) => {
    setSelectedTableToDelete(table);
    setIsDeleteTableModalOpen(true);
  };

  //function to close the table delete modal
  const closeDeleteTableModal = () => {
    setSelectedTableToDelete(null);
    setIsDeleteTableModalOpen(false);
  };

  // Function to open the device delete modal
  const openDeleteDeviceModal = (device) => {
    setSelectedDeviceToDelete(device);
    setIsDeleteDeviceModalOpen(true);
  };

  // Function to close the device delete modal
  const closeDeleteDeviceModal = () => {
    setSelectedDeviceToDelete(null);
    setIsDeleteDeviceModalOpen(false);
  };

  //modify the handleDeleteTable function to directly open the delete modal
  const handleDeleteTable = (tableId) => {
    console.log("handleDeleteTable : "+tableId);
    const tableToDelete = getTableList.find(
      (table) => table.table_id === tableId
    );
    console.log("tableToDelete : "+tableToDelete);
    openDeleteTableModal(tableToDelete);
  };

  const handleConfirmDelete = async (tableId) => {
    console.log("handleConfirmDelete : "+tableId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}Table/DeleteTable/${tableId}`
      );
      if (response.status === 200) {
        alert("Table deleted successfully.");
        setTableList(
          getTableList.filter(
            (table) => table.tableId !== tableId
          )
        );
        setIsDeleteTableModalOpen(false);
        fetchTables();
      } else {
        setMessage("Failed to delete Table.");
      }
    } catch (error) {
      console.error("Error deleting Table", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  //modify the handleDeleteDevice function to directly open the delete modal
  const handleDeleteDevice = (deviceId) => {
    const deviceToDelete = getDevicesList.find((device) => device.device_id === deviceId);
    openDeleteDeviceModal(deviceToDelete);
  };

  const handleConfirmDeleteDevice = async (deviceId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}Device/DeleteDevice/${deviceId}`
      );
      if (response.status === 200) {
        setMessage("Device deleted successfully.");
        setDevicesList(getDevicesList.filter((device) => device.item_id !== deviceId));
        setIsDeleteDeviceModalOpen(false);
      } else {
        setMessage("Failed to delete device.");
      }
    } catch (error) {
      console.error("Error deleting device", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <main className="main-container">
      
      <div className="main-title">
        <h3>TABLES AND DEVICES</h3>
      </div>
      <br /><br />

      <div className="tab">
        <button className={`tablinks ${activeTab === "TABLES" ? "active" : ""}`}
          onClick={() => openTab("TABLES")}>
          TABLES
        </button>
        <button className={`tablinks ${activeTab === "DEVICES" ? "active" : ""}`}
          onClick={() => openTab("DEVICES")}>
          DEVICES
        </button>
      </div>

      <div id="tables" className={`tabcontent ${activeTab === "TABLES" ? "active" : ""}`}>
        <button className="addnew_btn" onClick={toggleModalTables}>
          <b><span className="addnew_text">ADD NEW TABLES</span></b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_tables">
          <div className="tablelist_table">
            <table>
              <thead>
                <tr>
                  <th>Table ID</th>
                  <th>Table No</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getTableList.map((tablelist) => (
                    <tr key={tablelist.table_id}>
                        <td>{tablelist.table_id}</td>
                        <td>Table {tablelist.table_number}</td>
                        <td>{tablelist.table_capacity}</td>
                        <td>{tablelist.table_status}</td>
                        <td>
                            <FaEdit className='edittable_icon' onClick={() => handleEditTableItem(tablelist)} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <RiDeleteBin5Fill className='deletetable_icon' onClick={() => handleDeleteTable(tablelist.table_id)}/>
                        </td>
                    </tr>
                  ))}                  
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="devices" className={`tabcontent ${activeTab === "DEVICES" ? "active" : ""}`}>
        <button className="addnew_btn" onClick={toggleModalDevices}>
          <b><span className="addnew_text">ADD NEW DEVICE</span></b>
          &nbsp;&nbsp;&nbsp;
          <MdAddToPhotos className="add_icon" />
        </button>
        <br /> <br /> <br />
        <div className="display_devices">
          <br />
          <div className="devices_table">
            <table>
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device UserName</th>
                  <th>Device Password</th>
                  <th>Device Token</th>
                  <th>User ID</th>
                  <th>Actions</th>
                </tr>
              </thead>             
              <tbody>
                {getDevicesList.length > 0 ? (
                  getDevicesList.map((devicelist) => (
                    <tr key={devicelist.device_id}>
                      <td>{devicelist.device_id}</td>
                      <td>{devicelist.device_username}</td>
                      <td>{devicelist.device_password}</td>
                      <td>{devicelist.device_token}</td>
                      <td>{devicelist.user_id}</td>
                      <td>
                        <FaEdit className="editdevice_icon" onClick={() => handleEditDevice(devicelist)}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <RiDeleteBin5Fill className="deletedevice_icon" onClick={() => handleDeleteDevice(devicelist.device_id)}/>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ fontSize: "17px", color: "#bb521f", backgroundColor: "#ffe5d7", textAlign: "center" }}>No devices added!!!</td>
                  </tr>
                )}
              </tbody>              
            </table>
          </div>
          <br />
        </div>
      </div>

      <Modal isOpen={isModalOpenTables} onRequestClose={toggleModalTables} contentLabel="Add New Table"
        className="modal" overlayClassName="modal-overlay">
            <div className="modal-header">
                <h2 className='modal-title'>{selectedTable ? "Edit Table" : "Add New Table"}</h2>
                <button className="modal-close-button" onClick={toggleModalTables}><IoClose /></button>
            </div>
            <div className='add'>
                <form className='flex-col' onSubmit={handleSubmitTables}>
                    <div className='add-table-number flex-col'>
                        <p>Table Number</p>
                        <input type='number' name='name' placeholder='1' value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}/>
                          {tableerrors.tableNumber && <p className="error">{tableerrors.tableNumber}</p>}
                    </div>
                    <div className='add-table-capacity flex-col'>
                        <p>Table Capacity</p>
                        <input type='number' name='name' placeholder='1' value={tableCapacity}
                          onChange={(e) => setTableCapacity(e.target.value)}/>
                          {tableerrors.tableCapacity && <p className="error">{tableerrors.tableCapacity}</p>}
                    </div>
                    <div className='add-tablestatus flex-col'>
                        <p>Table Status</p>
                        <select name='tablestatus' value={tableStatus}
                          onChange={(e) => setTableStatus(e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {tableerrors.tableStatus && <p className="error">{tableerrors.tableStatus}</p>}
                    </div>
                    <div className='table-buttons'>
                        <button type='submit' className='add-btn'>{selectedTable ? "UPDATE" : "ADD"}</button>
                        <button type='button' className='cancel-btn' onClick={toggleModalTables}>CANCEL</button>
                    </div>
                </form>
            </div>
      </Modal>

      <Modal isOpen={isModalOpenDevices} onRequestClose={toggleModalDevices} contentLabel="Add New Device"
        className="modal" overlayClassName="modal-overlay">
            <div className="modal-header">
                <h2 className='modal-title'>{selectedDevice ? "Edit Device" : "Add New Device"}</h2>
                <button className="modal-close-button" onClick={toggleModalDevices}><IoClose /></button>
            </div>
            <div className='add'>
                <form className='flex-col' onSubmit={handleSubmitDevices}>
                    <div className='add-device-id flex-col'>
                        <p>Device IMEI</p>
                        <input type='text' name='name' placeholder='Type here' value={deviceImei}
                        onChange={(e) => setDeviceImei(e.target.value)}/>
                        {deviceerrors.deviceImei && <p className="error">{deviceerrors.deviceImei}</p>}
                    </div>
                    <div className='add-device-username flex-col'>
                        <p>Device UserName</p>
                        <input type='text' name='name' placeholder='Type here' value={deviceUserName}
                        onChange={(e) => setDeviceUserName(e.target.value)}/>
                        {deviceerrors.deviceUserName && <p className="error">{deviceerrors.deviceUserName}</p>}
                    </div>
                    <div className='add-device-password flex-col'>
                        <p>Device Password</p>
                        <input type='text' name='name' placeholder='Type here' value={devicePassword}
                        onChange={(e) => setDevicePassword(e.target.value)}/>
                        {deviceerrors.devicePassword && <p className="error">{deviceerrors.devicePassword}</p>}
                    </div>
                    <div className='add-device-token flex-col'>
                        <p>Device Token</p>
                        <input type='text' name='name' placeholder='Type here' value={deviceToken}
                        onChange={(e) => setDeviceToken(e.target.value)}/>
                        {deviceerrors.deviceToken && <p className="error">{deviceerrors.deviceToken}</p>}
                    </div>
                    <div className='add-user-id flex-col'>
                        <p>User ID</p>
                        <select name='user_id' value={deviceUserID}
                          onChange={(e) => setDeviceUserID(e.target.value)}>
                          <option value="">Select User ID</option>
                          {getUsersList.map((users) => (
                            <option key={users.user_id} value={users.user_id}>
                              {users.user_name}
                            </option>
                          ))}
                        </select>
                        {deviceerrors.deviceUserID && <p className="error">{deviceerrors.deviceUserID}</p>}
                    </div>
                    {/*<div className='add-devicestatus flex-col'>
                        <p>Device Status</p>
                        <select name='devicestatus' value={deviceStatus}
                          onChange={(e) => setDeviceStatus(e.target.value)}>
                          <option value="">Select Device Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        {deviceerrors.deviceStatus && <p className="error">{deviceerrors.deviceStatus}</p>}
                    </div>*/}
                    <div className='device-buttons'>
                        <button type='submit' className='add-btn'>{selectedDevice ? "UPDATE" : "ADD"}</button>
                        <button type='button' className='cancel-btn' onClick={toggleModalDevices}>CANCEL</button>
                    </div>
                </form>
            </div>
        </Modal>

        <Modal isOpen={isDeleteTableModalOpen} onRequestClose={closeDeleteTableModal} 
          contentLabel="Delete Table" className="modal" overlayClassName="modal-overlay">
        <div className="modal-header">
          <h2 className="modal-title">Delete Table</h2>
          <button className="modal-close-button" onClick={closeDeleteTableModal}><IoClose /></button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this table?</p>
          <br/>
          <div className="delete-buttons">
            <button className="delete-btn"
              onClick={() => handleConfirmDelete(selectedTableToDelete.table_id) }>
              Delete
            </button>&nbsp;
            <button className="cancel-btn" onClick={closeDeleteTableModal}>Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteDeviceModalOpen} onRequestClose={closeDeleteDeviceModal} 
        contentLabel="Delete device" className="modal" overlayClassName="modal-overlay" >
        <div className="modal-header">
          <h2 className="modal-title">Delete device</h2>
          <button className="modal-close-button" onClick={closeDeleteDeviceModal}><IoClose /></button>
        </div>
        <div className="delete">
          <p>Are you sure you want to delete this device?</p>
          <div className="delete-buttons">
            <button className="delete-btn"
              onClick={() => handleConfirmDeleteDevice(selectedDeviceToDelete.item_id)}>
              Delete
            </button>
            <button className="cancel-btn" onClick={closeDeleteDeviceModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </main>
  );
};
