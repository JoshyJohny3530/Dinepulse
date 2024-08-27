using DinePulse_API.Database;
using DinePulse_API.Hubs;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Data.SqlClient;
using System.Data;

namespace DinePulse_API.Controllers.CustomerWebsiteControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserMessageController : Controller
    {
        DataLayer dataLayer;
        private readonly IHubContext<AdminNotificationHub> _hubContext;
        readonly IConfiguration _iconfiguration;
        public UserMessageController(IConfiguration iconfiguration, IHubContext<AdminNotificationHub> hubContext)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
            _hubContext = hubContext;
        }
        
        [HttpPost]
        [ActionName("AddMessage")]
        public async Task<IActionResult> AddMessageAsync([FromBody] UserMessageModel message)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@Name", SqlDbType = SqlDbType.NVarChar, Value = message.Name },
            new SqlParameter() { ParameterName = "@Email", SqlDbType = SqlDbType.NVarChar, Value = message.Email },
            new SqlParameter() { ParameterName = "@PhoneNumber", SqlDbType = SqlDbType.NVarChar, Value = message.PhoneNumber ?? (object)DBNull.Value },
            new SqlParameter() { ParameterName = "@Message", SqlDbType = SqlDbType.NVarChar, Value = message.Message }
        };

               await dataLayer.ExecuteInsertAsync("UserMessage_Insert", sp);
               await _hubContext.Clients.All.SendAsync("UserMessageReceived", message);
               return Ok("Message added successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding message..." + ex.Message);
                return BadRequest("Error adding message. Please try again later.");
            }
        }




    }
}
