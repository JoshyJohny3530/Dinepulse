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
    public class DeviceController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public DeviceController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpGet]
        [ActionName("GetDevices")]
        public IActionResult GetDevices()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("Device_GetDevices");
                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No devices found");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting devices..." + ex.Message);
                return BadRequest("Error fetching devices. Please try again later.");
            }
        }

        [HttpPost]
        [ActionName("AddDevice")]
        public IActionResult AddDevice([FromBody] DeviceModel device)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@device_id", SqlDbType = SqlDbType.VarChar, Value = device.DeviceId },
            new SqlParameter() { ParameterName = "@device_username", SqlDbType = SqlDbType.VarChar, Value = device.DeviceUsername },
            new SqlParameter() { ParameterName = "@device_password", SqlDbType = SqlDbType.VarChar, Value = device.DevicePassword },
            new SqlParameter() { ParameterName = "@device_token", SqlDbType = SqlDbType.VarChar, Value = device.DeviceToken },
            new SqlParameter() { ParameterName = "@user_id", SqlDbType = SqlDbType.Int, Value = device.UserId }
        };

                dataLayer.ExecuteSp_transaction("Device_AddDevice", sp);
                return Ok("Device added successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding device..." + ex.Message);
                return BadRequest("Error adding device. Please try again later.");
            }
        }


        [HttpPut]
        [ActionName("UpdateDevice")]
        public IActionResult UpdateDevice([FromBody] DeviceModel device)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@device_id", SqlDbType = SqlDbType.VarChar, Value = device.DeviceId },
            new SqlParameter() { ParameterName = "@device_username", SqlDbType = SqlDbType.VarChar, Value = device.DeviceUsername },
            new SqlParameter() { ParameterName = "@device_password", SqlDbType = SqlDbType.VarChar, Value = device.DevicePassword },
            new SqlParameter() { ParameterName = "@device_token", SqlDbType = SqlDbType.VarChar, Value = device.DeviceToken },
            new SqlParameter() { ParameterName = "@user_id", SqlDbType = SqlDbType.Int, Value = device.UserId }
        };

                dataLayer.ExecuteSp_transaction("Device_UpdateDevice", sp);
                return Ok("Device updated successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error updating device..." + ex.Message);
                return BadRequest("Error updating device. Please try again later.");
            }
        }

        [HttpDelete("{deviceId}")]
        [ActionName("DeleteDevice")]
        public IActionResult DeleteDevice(string deviceId)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@device_id", SqlDbType = SqlDbType.VarChar, Value = deviceId }
        };

                dataLayer.ExecuteSp_transaction("Device_DeleteDevice", sp);
                return Ok("Device deleted successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error deleting device..." + ex.Message);
                return BadRequest("Error deleting device. Please try again later.");
            }
        }

    }
}
