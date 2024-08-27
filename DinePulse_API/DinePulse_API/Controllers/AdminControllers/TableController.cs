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
    public class TableController : ControllerBase
    {

        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public TableController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }
        [HttpGet]
        [ActionName("GetTables")]
        public IActionResult GetTables()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("Table_GetTables");
                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No tables found");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting tables..." + ex.Message);
                return BadRequest("Error fetching tables. Please try again later.");
            }
        }

        [HttpPost]
        [ActionName("AddTable")]
        public IActionResult AddTable([FromBody] TableModel table)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
                {
                    new SqlParameter() { ParameterName = "@table_number", SqlDbType = SqlDbType.Int, Value = table.TableNumber },
                    new SqlParameter() { ParameterName = "@table_capacity", SqlDbType = SqlDbType.Int, Value = table.TableCapacity },
                    new SqlParameter() { ParameterName = "@table_status", SqlDbType = SqlDbType.VarChar, Value = table.TableStatus }
                };
                try
                {
                    dataLayer.ExecuteSp_transaction("Table_AddTable", sp);
                    return Ok("Table added successfully");
                }
                catch (InvalidOperationException ex)
                {
                    return BadRequest("Error: " + ex.Message);
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error adding table..." + ex.Message);
                return BadRequest("Error adding table. Please try again later.");
            }
        }

        [HttpPut]
        [ActionName("UpdateTable")]
        public IActionResult UpdateTable([FromBody] TableModel table)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@table_id", SqlDbType = SqlDbType.Int, Value = table.TableId },
            new SqlParameter() { ParameterName = "@table_number", SqlDbType = SqlDbType.Int, Value = table.TableNumber },
            new SqlParameter() { ParameterName = "@table_capacity", SqlDbType = SqlDbType.Int, Value = table.TableCapacity },
            new SqlParameter() { ParameterName = "@table_status", SqlDbType = SqlDbType.VarChar, Value = table.TableStatus }
        };

                dataLayer.ExecuteSp_transaction("Table_UpdateTable", sp);
                return Ok("Table updated successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error updating table..." + ex.Message);
                return BadRequest("Error updating table. Please try again later.");
            }
        }


        [HttpDelete("{tableId}")]
        [ActionName("DeleteTable")]
        public IActionResult DeleteTable(int tableId)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@table_id", SqlDbType = SqlDbType.Int, Value = tableId }
        };

                dataLayer.ExecuteSp_transaction("Table_DeleteTable", sp);
                return Ok("Table deleted successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error deleting table..." + ex.Message);
                return BadRequest("Error deleting table. Please try again later.");
            }
        }

    }
}
