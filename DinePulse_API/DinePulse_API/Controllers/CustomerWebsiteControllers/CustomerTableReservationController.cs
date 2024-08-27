using DinePulse_API.Database;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using DinePulse_API.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace DinePulse_API.Controllers.CustomerWebsiteControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerTableReservationController : Controller
    {
        DataLayer dataLayer;
        private readonly IHubContext<AdminNotificationHub> _hubContext;
        readonly IConfiguration _iconfiguration;
        public CustomerTableReservationController(IConfiguration iconfiguration, IHubContext<AdminNotificationHub> hubContext)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
            _hubContext = hubContext;
        }
      
        [HttpPost]
        [ActionName("AddReservation")]
        public async Task<IActionResult> AddReservationAsync([FromBody] CustomerReservationModel reservation)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
            {
                new SqlParameter() { ParameterName = "@guest_count", SqlDbType = SqlDbType.Int, Value = reservation.GuestCount },
                new SqlParameter() { ParameterName = "@customer_email", SqlDbType = SqlDbType.VarChar, Value = reservation.CustomerEmail },
                new SqlParameter() { ParameterName = "@customer_phone", SqlDbType = SqlDbType.VarChar, Value = reservation.CustomerPhone },
                new SqlParameter() { ParameterName = "@reservation_date", SqlDbType = SqlDbType.VarChar, Value = reservation.ReservationDate },
                new SqlParameter() { ParameterName = "@reservation_time", SqlDbType = SqlDbType.VarChar, Value = reservation.ReservationTime },
                new SqlParameter() { ParameterName = "@customer_suggestion", SqlDbType = SqlDbType.Text, Value = reservation.CustomerSuggestion ?? (object)DBNull.Value }
            };

                dataLayer.ExecuteSp_transaction("Reservation_InsertReservationCustomer", sp);
                await _hubContext.Clients.All.SendAsync("CustomerTableReserved", reservation);
                return Ok("Reservation added successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding reservation..." + ex.Message);
                return BadRequest("Error adding reservation. Please try again later.");
            }
        }
    }
}
