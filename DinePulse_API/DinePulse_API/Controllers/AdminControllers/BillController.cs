using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using DinePulse_API.Database;

namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {

        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public BillController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }
        [HttpGet]
        [ActionName("GetTotalRevenueReport")]
        public IActionResult GetTotalRevenueReport([FromQuery] DateTime reportDate)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
        {
            new SqlParameter("@ReportDate", SqlDbType.VarChar) { Value = reportDate }
        };


                DataSet ds = dataLayer.Getbulkfromdb_ds("Report_TotalRevenueReport", parameters);

                DataTable detailsTable = ds.Tables[0];
                DataTable totalTable = ds.Tables[1];
                List<RevenueReport> revenueReports = new List<RevenueReport>();
                foreach (DataRow row in detailsTable.Rows)
                {
                    RevenueReport report = new RevenueReport
                    {
                        CustomerName = row["customer_name"].ToString(),
                        TotalAmount = Convert.ToDecimal(row["total_amount"])
                    };

                    revenueReports.Add(report);
                }
                decimal grandTotal = 0;
                if (totalTable.Rows.Count > 0)
                {
                    grandTotal = Convert.ToDecimal(totalTable.Rows[0]["GrandTotal"]);
                }

                RevenueReportResponse response = new RevenueReportResponse
                {
                    RevenueReports = revenueReports,
                    GrandTotal = grandTotal
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error retrieving total revenue report: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }



    }
}
