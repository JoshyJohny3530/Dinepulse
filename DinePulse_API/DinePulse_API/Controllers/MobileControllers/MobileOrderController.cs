using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using DinePulse_API.Database;
using Microsoft.Extensions.Configuration;
using DinePulse_API.Models;
using System.Text.Json;
using DinePulse_API.Utils;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;
using DinePulse_API.Hubs;

namespace DinePulse_API.Controllers.MobileControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MobileOrderController : Controller
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        private readonly IHubContext<AdminNotificationHub> _hubContext;
        public MobileOrderController(IConfiguration iconfiguration, IHubContext<AdminNotificationHub> hubContext)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequestModel orderRequest)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
                {
                    new SqlParameter() { ParameterName = "@customerId", SqlDbType = SqlDbType.Int, Value = orderRequest.CustomerId },
                    new SqlParameter() { ParameterName = "@tableId", SqlDbType = SqlDbType.Int, Value = orderRequest.TableId },
                    new SqlParameter() { ParameterName = "@orderTypeId", SqlDbType = SqlDbType.Int, Value = orderRequest.OrderTypeId },
                    new SqlParameter() { ParameterName = "@statusId", SqlDbType = SqlDbType.Int, Value = orderRequest.StatusId },
                    new SqlParameter() { ParameterName = "@orderDetails", SqlDbType = SqlDbType.NVarChar, Value =  JsonConvert.SerializeObject(orderRequest.OrderDetails) }
                };

                var result = await dataLayer.ExecuteInsertAsync("Order_InsertDetails", sp);

                if (result.Result == 1)
                {
                    await _hubContext.Clients.All.SendAsync("CustomerOrderPlaced", orderRequest);
                    return Ok("Order added successfully");
                }
                else
                {
                    return BadRequest($"Error adding order: {result.ErrorMessage}");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding order..." + ex.Message);
                return BadRequest("Error adding order. Please try again later.");
            }
        }
    }
}
