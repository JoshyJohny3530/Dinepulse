using DinePulse_API.Database;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Data;
using System.Threading.Tasks;
using System.Data.SqlClient;


namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserMessageController : Controller
    {
        DataLayer dataLayer;
        
        readonly IConfiguration _iconfiguration;
        public UserMessageController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
            
        }

        [HttpGet]
        [ActionName("GetUserMessages")]
        public IActionResult GetMessages()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("UserMessage_Get");
                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No reservations found");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting reservations..." + ex.Message);
                return BadRequest("Error fetching reservations. Please try again later.");
            }
        }

        [HttpDelete]
        [ActionName("DeleteMessage")]
        public async Task<IActionResult> DeleteMessageAsync(int id)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@Id", SqlDbType = SqlDbType.Int, Value = id }
        };

                await dataLayer.ExecuteInsertAsync("UserMessage_Delete", sp);
                return Ok("Message deleted successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error deleting message..." + ex.Message);
                return BadRequest("Error deleting message. Please try again later.");
            }
        }
    }
}
