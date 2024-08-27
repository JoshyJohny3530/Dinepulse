import React, { useState } from 'react';
import axios from 'axios';

export const DashboardReports = () => {
    const [activeTab, setActiveTab] = useState('SALES REPORT');
    const [monthDate, setMonthDate] = useState("");
    const [dayDate, setDayDate] = useState("");
    const [selectedMonthWiseReport, setMonthWiseReport] = useState({ items: [], grandTotal: 0 });
    const [selectedDateWiseReport, setDateWiseReport] = useState({ items: [], grandTotal: 0 });

    const openCity = (cityName) => {
      setActiveTab(cityName);
    };
  
    const handleMonthChange = async(e) => {
        setMonthDate(e.target.value);
        const inputmonthdata = e.target.value;

        //extract year and month from the input value
        const [inputyear, inputmonth] = inputmonthdata.split('-');

        //format the URL with year and month
        const API_URL = `${process.env.REACT_APP_API_URL}Report/GetSalesReportMonthly?ReportYear=${inputyear}&ReportMonth=${inputmonth}`;
        try {
            const response = await axios.get(API_URL);
            const parsedData = response.data;

            //extract and parse the data
            const items = parsedData.Items || [];
            const grandTotal = JSON.parse(parsedData.GrandTotal).grand_total || 0;
            setMonthWiseReport({ items, grandTotal });
        } catch (error) {
            console.error("Caught error while fetching GetSalesReport:", error);
            setMonthWiseReport({ items: [], grandTotal: 0 });
        }
    };

    const handleDayChange = async(e) => {
        setDayDate(e.target.value);
        const inputdate = e.target.value;
        const API_URL = `${process.env.REACT_APP_API_URL}Report/GetSalesReport?reportdate=${inputdate}`;
        try {
            const response = await axios.get(API_URL);
            const parsedData = response.data;

            //extract and parse the data
            const items = parsedData.Items || [];
            const grandTotal = JSON.parse(parsedData.GrandTotal).grand_total || 0;
            setDateWiseReport({ items, grandTotal });
        } catch (error) {
            console.error("Caught error while fetching GetSalesReport:", error);
            setDateWiseReport({ items: [], grandTotal: 0 });
        }
    };
    
    return (
      <main className='main-container'>
          <div className='main-title'>
              <h3>REPORTS</h3>
          </div>
          <br/><br/>
          <div className="reports-tab">
              <button className={`tablinks ${activeTab === 'SALES REPORT' ? 'active' : ''}`}
              onClick={() => openCity('SALES REPORT')}>MONTHLY SALES REPORT
              </button>
              <button className={`tablinks ${activeTab === 'DAYWISE REPORT' ? 'active' : ''}`}
              onClick={() => openCity('DAYWISE REPORT')}>DAYWISE SALES REPORT
              </button>
          </div>
          <div>
            {activeTab === 'SALES REPORT' && (
              <>
                <label htmlFor="monthDate" className="label">Choose Month:</label>
                <input type="month" id="monthDate" name="monthDate" 
                    className="textContent" value={monthDate} onChange={handleMonthChange}/>
              </>
            )}
            {activeTab === 'DAYWISE REPORT' && (
              <>
                <label htmlFor="dayDate" className="label">Choose Date:</label>
                <input type="date" id="dayDate" name="dayDate" 
                    className="textContent" value={dayDate} onChange={handleDayChange}/>
              </>
            )}
          </div>
          <div id="salesreport" className={`reportcontent ${activeTab === 'SALES REPORT' ? 'active' : ''}`}>
              <br/> <br/> <br/> 
              <div className='display_salesreport'>
                  <br/>         
                  <div className='salesreport_table'>                           
                    <table>
                        <thead>
                            <tr>
                                <th>SerialNo.</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedMonthWiseReport.items.length > 0 ? (
                                selectedMonthWiseReport.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.total_quantity}</td>
                                        <td>{item.item_price}</td>
                                        <td>{item.total_amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ fontSize: "17px", color: "#bb521f", backgroundColor: "#ffe5d7", textAlign: "center" }}>No data to retrieve for this month!!!</td>
                                </tr>
                            )}
                            {/* Grand Total Row */}
                            {selectedMonthWiseReport.items.length > 0 && (
                                <tr style={{ backgroundColor: "#f7ded3" }}>
                                    <td colSpan="4" style={{ textAlign: "right", color: "red", fontSize: "17px" }}>Grand Total:</td>
                                    <td style={{ color: "red", fontSize: "17px" }}>${selectedMonthWiseReport.grandTotal.toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                  </div>
                  <br/>
              </div>            
          </div>
          <div id="stafflist" className={`reportcontent ${activeTab === 'DAYWISE REPORT' ? 'active' : ''}`}>
              <br/> <br/> <br/> 
              <div className='display_stafflist'>
                  <br/>         
                  <div className='stafflist_table'>                           
                      <table>
                          <thead>
                              <tr>
                                  <th>SerialNo.</th>
                                  <th>Item Name</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th>Total Amount</th>
                              </tr>
                          </thead>
                          <tbody>
                            {selectedDateWiseReport.items.length > 0 ? (
                                selectedDateWiseReport.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.total_quantity}</td>
                                        <td>{item.item_price}</td>
                                        <td>{item.total_amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ fontSize: "17px", color: "#bb521f", backgroundColor: "#ffe5d7", textAlign: "center" }}>No data to retrieve for this day!!!</td>
                                </tr>
                            )}
                            {/* Grand Total Row */}
                            {selectedDateWiseReport.items.length > 0 && (
                                <tr style={{ backgroundColor: "#f7ded3" }}>
                                    <td colSpan="4" style={{ textAlign: "right", color: "red", fontSize: "17px" }}>Grand Total:</td>
                                    <td style={{ color: "red", fontSize: "17px" }}>${selectedDateWiseReport.grandTotal.toFixed(2)}</td>
                                </tr>
                            )}
                          </tbody>
                      </table>
                  </div>
                  <br/>
              </div>
          </div>
      </main> 
    )
}
