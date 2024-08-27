using DinePulse_API.Database;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Identity.Data;
using DinePulse_API.Models;


namespace DinePulse_API.Controllers.AdminControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;

        public LoginController(IConfiguration iconfiguration)
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
                        var user = new
                            {
                                Name = table.Rows[0]["user_name"].ToString(),
                                UserID = table.Rows[0]["user_id"].ToString(), 
                                                   
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

        [HttpPost]
        [ActionName("AddUser")]
        public IActionResult AddUser([FromBody] AddUserModel AddUserRequest)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
                {

                    new SqlParameter("@user_name", SqlDbType.VarChar, 255) { Value = AddUserRequest.userName },
                    new SqlParameter("@user_password", SqlDbType.VarChar, 255) { Value = AddUserRequest.userPassword },
                    new SqlParameter("@user_type", SqlDbType.VarChar, 50) { Value = AddUserRequest.userType },
                    new SqlParameter("@user_status", SqlDbType.VarChar, 50) { Value = "Active" },
                    new SqlParameter("@user_registered_date", SqlDbType.Date) { Value = DateTime.Now }
                };

                int rowsAffected = dataLayer.ExecuteSp_transaction("InsertUser", parameters);

                if (rowsAffected > 0)
                {
                    return Ok("User added successfully.");
                }
                else
                {
                    return BadRequest("Failed to add user.");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding user: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut]
        [ActionName("EditUser")]
        public IActionResult EditUser([FromBody] EditUserModel editUserModel)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@user_id", SqlDbType.Int) { Value = editUserModel.userId },
                    new SqlParameter("@user_name", SqlDbType.VarChar, 255) { Value = editUserModel.userName },
                    new SqlParameter("@user_password", SqlDbType.VarChar,255) { Value = editUserModel.userPassword },
                    new SqlParameter("@user_type", SqlDbType.VarChar, 50) { Value = editUserModel.userType },
                    new SqlParameter("@user_status", SqlDbType.VarChar, 50) { Value = editUserModel.userStatus }
                };

                int rowsAffected = dataLayer.ExecuteSp_transaction("User_UpdateUser", parameters);

                if (rowsAffected > 0)
                {
                    return Ok("User updated successfully.");
                }
                else
                {
                    return BadRequest("Failed to update user.");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error updating user: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet]
        [ActionName("GetUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("GetUsers");

                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No users found.");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting users: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        [ActionName("GetUserType")]
        public IActionResult GetUserType([FromForm] string userName)
        {
            try
            {
               
                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    
                    new SqlParameter("@user_name", SqlDbType.VarChar, 255) { Value = userName },
                   
                };
                DataTable table = dataLayer.Getbulkfromdb("Sp_GetUserType",parameters);
                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No users found.");
                }
            }
            catch (InvalidOperationException ex)
            {
               
                new LogHelper().LogError("Custom error: " + ex.Message);
                return NotFound("Error: " + ex.Message);
            }
            catch (Exception ex)
            {
               
                new LogHelper().LogError("Error getting users: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete]
        [ActionName("DeleteUser")]
        public IActionResult DeleteUser(int userId)
        {
            try
            {
                List<SqlParameter> parameters = new List<SqlParameter>
                {
                    new SqlParameter("@user_id", SqlDbType.Int) { Value = userId }
                };

                int rowsAffected = dataLayer.ExecuteSp_transaction("DeleteUser", parameters);

                if (rowsAffected > 0)
                {
                    return Ok("User deleted successfully.");
                }
                else
                {
                    return NotFound("User not found.");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error deleting user: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
