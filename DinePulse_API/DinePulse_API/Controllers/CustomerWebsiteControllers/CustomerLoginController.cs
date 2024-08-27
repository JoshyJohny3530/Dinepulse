using DinePulse_API.Database;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using DinePulse_API.Models;
using DinePulse_API.Utils;

namespace DinePulse_API.Controllers.CustomerWebsiteControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerLoginController : Controller
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;

        public CustomerLoginController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }
        [HttpPost]
        [ActionName("RegisterCustomer")]
        public IActionResult RegisterCustomer([FromBody] CustomerRegisterModel customerRegister)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@customer_name", SqlDbType.VarChar, 100) { Value = customerRegister.CustomerName },
                    new SqlParameter("@customer_email", SqlDbType.VarChar, 100) { Value = customerRegister.CustomerEmail },
                    new SqlParameter("@customer_phone", SqlDbType.VarChar, 20) { Value = customerRegister.CustomerPhone },
                    new SqlParameter("@customer_password", SqlDbType.VarChar, 300) { Value = customerRegister.CustomerPassword },
                    new SqlParameter("@Result", SqlDbType.Int) { Direction = ParameterDirection.Output },
                    new SqlParameter("@ErrorMessage", SqlDbType.NVarChar, 4000) { Direction = ParameterDirection.Output }
                };

                dataLayer.Execute_sp_with_result("CW_RegisterCustomer", parameters);

                int result = (int)parameters.Find(p => p.ParameterName == "@Result").Value;
                string errorMessage = parameters.Find(p => p.ParameterName == "@ErrorMessage").Value.ToString();

                if (result == 1)
                {
                    return Ok("Customer registered successfully.");
                }
                else
                {
                    return BadRequest("Failed to register customer.Error:"+errorMessage);
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error registering customer: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        [ActionName("LoginCustomer")]
        public IActionResult Login([FromBody] LoginUserModel loginRequest)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
        {
            new SqlParameter("@customer_username", SqlDbType.VarChar, 50) { Value = loginRequest.userName }
        };
                DataTable table = dataLayer.Getbulkfromdb("GetHashPassword_customer", parameters);
                if (table.Rows.Count > 0)
                {
                    string storedHashedPassword = table.Rows[0]["customer_password"].ToString();
                    if (BCrypt.Net.BCrypt.Verify(loginRequest.userPassword, storedHashedPassword))
                    {
                        var user = new
                        {
                            DisplayName = table.Rows[0]["customer_name"].ToString(),
                            UserID = table.Rows[0]["customer_id"].ToString(),
                            UserName= table.Rows[0]["customer_username"].ToString(),
                            UserPhone= table.Rows[0]["customer_phone"].ToString(),
                            UserEmail= table.Rows[0]["customer_email"].ToString(),
                           

                        };

                        return Ok(user);
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
