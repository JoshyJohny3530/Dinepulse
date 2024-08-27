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
    public class ShopConfigController : ControllerBase
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public ShopConfigController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpGet]
        [ActionName("GetShopDetails")]
        public IActionResult GetShops()
        {
            try
            {
                DataTable table = dataLayer.Getfromdb("Shop_GetShopDetails");
                if (table.Rows.Count > 0)
                {
                    string JSONresult = JsonHelper.DataTableToJsonObj(table);
                    return Ok(new { data = JSONresult });
                }
                else
                {
                    return NotFound("No shops found");
                }
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting shops..." + ex.Message);
                return BadRequest("Error fetching shops. Please try again later.");
            }
        }

        [HttpPut]
        [ActionName("UpdateShopDetails")]
        public IActionResult UpdateShop([FromBody] ShopModel shop)
        {
            try
            {
                List<SqlParameter> sp = new List<SqlParameter>()
        {
            new SqlParameter() { ParameterName = "@shop_id", SqlDbType = SqlDbType.Int, Value = shop.ShopId },
            new SqlParameter() { ParameterName = "@shop_name", SqlDbType = SqlDbType.VarChar, Value = shop.ShopName },
            new SqlParameter() { ParameterName = "@shop_email", SqlDbType = SqlDbType.VarChar, Value = shop.ShopEmail },
            new SqlParameter() { ParameterName = "@shop_phone_number", SqlDbType = SqlDbType.VarChar, Value = shop.ShopPhoneNumber },
            new SqlParameter() { ParameterName = "@shop_address", SqlDbType = SqlDbType.VarChar, Value = shop.ShopAddress },
            new SqlParameter() { ParameterName = "@tax_rate", SqlDbType = SqlDbType.Decimal, Value = shop.TaxRate }
        };

                dataLayer.ExecuteSp_transaction("Shop_UpdateShopDetails", sp);
                return Ok("Shop updated successfully");
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error updating shop..." + ex.Message);
                return BadRequest("Error updating shop. Please try again later.");
            }
        }



    }
}
