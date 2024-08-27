using DinePulse_API.Database;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public ReportController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }
        [HttpGet]
        [ActionName("GetSalesReport")]
        public IActionResult GetSalesReport(string reportdate)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
                {
                 new SqlParameter() { ParameterName = "@ReportDate", SqlDbType = SqlDbType.Date, Value = reportdate }
                };

                DataTable table = dataLayer.Getbulkfromdb("Reports_TotalSaleReport", sp);

                if (table.Rows.Count > 0)
                {

                    string jsonResult = table.Rows[0][0].ToString();

                    if (!string.IsNullOrEmpty(jsonResult))
                    {
                        return Content(jsonResult, "application/json");
                    }
                    else
                    {
                        return NotFound(); // No data found
                    }
                }
                else
                {
                    return NotFound(); // No data found
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting data..." + ex.Message);
                return BadRequest("No Data Fetched...Please Try Later");
            }
        }


        [HttpGet]
        [ActionName("GetSalesReportMonthly")]
        public IActionResult GetSalesReportMonthly(int ReportYear, int ReportMonth)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
                {
                 new SqlParameter() { ParameterName = "@ReportMonth", SqlDbType = SqlDbType.Int, Value = ReportMonth },
                 new SqlParameter() { ParameterName = "@ReportYear", SqlDbType = SqlDbType.Int, Value = ReportYear }
                };

                DataTable table = dataLayer.Getbulkfromdb("[Reports_TotalSaleReport_Monthly]", sp);

                if (table.Rows.Count > 0)
                {

                    string jsonResult = table.Rows[0][0].ToString();

                    if (!string.IsNullOrEmpty(jsonResult))
                    {
                        return Content(jsonResult, "application/json");
                    }
                    else
                    {
                        return NotFound(); 
                    }
                }
                else
                {
                    return NotFound(); 
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting data..." + ex.Message);
                return BadRequest("No Data Fetched...Please Try Later");
            }
        }
    }
}
