using DinePulse_API.Database;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace DinePulse_API.Controllers.AdminControllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TableReservationController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public TableReservationController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }
        [HttpGet]
        [ActionName("GetReservations")]
        public IActionResult GetReservations()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("Reservation_GetReservations");
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

        [HttpPost]
        [ActionName("AddReservation")]
        public IActionResult AddReservation([FromBody] TableReservationModel reservation)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@table_id", SqlDbType = SqlDbType.Int, Value = reservation.TableId },
            new SqlParameter() { ParameterName = "@reservation_date", SqlDbType = SqlDbType.DateTime, Value = reservation.ReservationDate },
            new SqlParameter() { ParameterName = "@customer_id", SqlDbType = SqlDbType.Int, Value = reservation.CustomerId },
            new SqlParameter() { ParameterName = "@slot_id", SqlDbType = SqlDbType.Int, Value = reservation.SlotId },
            new SqlParameter() { ParameterName = "@status", SqlDbType = SqlDbType.VarChar, Value = reservation.Status }
        };

                dataLayer.ExecuteSp_transaction("Reservation_AddReservation", sp);
                return Ok("Reservation added successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding reservation..." + ex.Message);
                return BadRequest("Error adding reservation. Please try again later.");
            }
        }
        [HttpPut]
        [ActionName("UpdateReservation")]
        public IActionResult UpdateReservation([FromBody] TableReservationModel reservation)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@reservation_id", SqlDbType = SqlDbType.Int, Value = reservation.ReservationId },
            new SqlParameter() { ParameterName = "@table_id", SqlDbType = SqlDbType.Int, Value = reservation.TableId },
            new SqlParameter() { ParameterName = "@reservation_date", SqlDbType = SqlDbType.DateTime, Value = reservation.ReservationDate },
            new SqlParameter() { ParameterName = "@customer_id", SqlDbType = SqlDbType.Int, Value = reservation.CustomerId },
            new SqlParameter() { ParameterName = "@slot_id", SqlDbType = SqlDbType.Int, Value = reservation.SlotId },
            new SqlParameter() { ParameterName = "@status", SqlDbType = SqlDbType.VarChar, Value = reservation.Status }
        };

                dataLayer.ExecuteSp_transaction("Reservation_UpdateReservation", sp);
                return Ok("Reservation updated successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error updating reservation..." + ex.Message);
                return BadRequest("Error updating reservation. Please try again later.");
            }
        }
        [HttpDelete("{reservationId}")]
        [ActionName("DeleteReservation")]
        public IActionResult DeleteReservation(int reservationId)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@reservation_id", SqlDbType = SqlDbType.Int, Value = reservationId }
        };

                dataLayer.ExecuteSp_transaction("DeleteReservation", sp);
                return Ok("Reservation deleted successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error deleting reservation..." + ex.Message);
                return BadRequest("Error deleting reservation. Please try again later.");
            }
        }

    }
}
