using DinePulse_API.Database;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace DinePulse_API.Controllers.MobileControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MobileLoginController : Controller
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;

        public MobileLoginController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpPost]
        [ActionName("LoginUser")]
        public IActionResult Login([FromBody] LoginUserModel loginRequest)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
        {
            new SqlParameter("@user_name", SqlDbType.VarChar, 50) { Value = loginRequest.userName }
        };
                DataTable table = dataLayer.Getbulkfromdb("GetHashPassword", parameters);
                if (table.Rows.Count > 0)
                {
                    string storedHashedPassword = table.Rows[0]["user_password"].ToString();
                    if (BCrypt.Net.BCrypt.Verify(loginRequest.userPassword, storedHashedPassword))
                    {
                        var response = new
                        {
                            UserId = table.Rows[0]["user_id"],
                            UserName = table.Rows[0]["user_name"],
                            Message = "Login successful."
                        };
                        return Ok(response);
                      
                    }
                    else
                    {
                        return Unauthorized("Invalid username or password.");
                    }
                }
                else
                {
                    return Unauthorized("Invalid username or password.");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error validating user: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

    }
}
