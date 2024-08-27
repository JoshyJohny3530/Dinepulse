using DinePulse_API.Database;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : Controller
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public OrderController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpGet]
        [ActionName("GetAllOrderStatus")]
        public IActionResult GetAllMenuCategories()
        {
            try
            {
                DataTable table = new DataTable();
                table = dataLayer.Getfromdb("Order_GetOrderStatus");
                if (table.Rows.Count > 0)
                {
                    string JSONresult;
                    JSONresult = JsonHelper.DataTableToJsonObj(table);
                    if (JSONresult != null)
                    {

                        return Ok("{\"data\":" + JSONresult + "}");
                    }
                    else
                    {
                        return BadRequest("No data");
                    }
                }
                else
                {
                    return BadRequest("No data");
                }


            }

            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting data..." + ex.Message);
                return BadRequest("No Data Fetched...Please Try Later");
            }
        }

        [HttpGet]
        [ActionName("GetRecentOrdersByFilter")]
        public IActionResult Dash_GetRecentOrder(int statusid)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@statusid", SqlDbType = SqlDbType.Int, Value = statusid }
        };

                DataTable table = new DataTable();
                table = dataLayer.Getbulkfromdb("Dash_GetRecentOrderByFilter", sp);

                if (table.Rows.Count > 0)
                {
                    string JSONresult;
                    JSONresult = JsonHelper.DataTableToJsonObj(table);

                    if (!string.IsNullOrEmpty(JSONresult))
                    {
                        return Ok(new { data = JSONresult });
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
        [ActionName("GetOrderById")]
        public IActionResult GetOrderById(int orderid)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
                {
                 new SqlParameter() { ParameterName = "@orderid", SqlDbType = SqlDbType.Int, Value = orderid }
                };

                DataTable table = dataLayer.Getbulkfromdb("Order_GetOrderById", sp);

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


    }
}
