using DinePulse_API.Database;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;

        public DashBoardController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpGet]
        [ActionName("GetDashboardData")]
        public IActionResult GetDashboardData()
        {
            try
            {
                DataTable table = new DataTable();
                table = dataLayer.Getfromdb("Dash_GetDashboardData");
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
        [ActionName("GetRecentOrders")]
        public IActionResult Dash_GetRecentOrder()
        {
            try
            {
                DataTable table = new DataTable();
                table = dataLayer.Getfromdb("Dash_GetRecentOrder");
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
        [ActionName("TestAPI")]
        public IActionResult TestAPI()
        {
            return Ok("Dinepulse API is live...");
        }

    }
}
