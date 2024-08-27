using DinePulse_API.Database;
using DinePulse_API.Models;
using DinePulse_API.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace DinePulse_API.Controllers.MobileControllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MobileMenuController : Controller
    {
        DataLayer dataLayer;
        readonly IConfiguration _iconfiguration;
        public MobileMenuController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            dataLayer = new DataLayer(_iconfiguration);
        }

        [HttpGet]
        [ActionName("GetMenuAll")]
        public IActionResult GetMenuAll()
        {
            try
            {
                DataTable table = new DataTable();
                table = dataLayer.Getfromdb("getmenuall");
                if (table.Rows.Count > 0)
                {
                    string JSONresult;
                    JSONresult = JsonHelper.DataTableToJsonObj(table);
                    if (JSONresult != null)
                    {

                        return Ok("{\"data\":" + JSONresult + "}");
                    }
                    else
                    {
                        return BadRequest("No data");
                    }
                }
                else
                {
                    return BadRequest("No data");
                }


            }

            catch (Exception ex)
            {
                new LogHelper().LogError("Error getting data..." + ex.Message);
                return BadRequest("No Data Fetched...Please Try Later");
            }
        }

        [HttpGet]
        [ActionName("GetAllMenuCategories")]
        public IActionResult GetAllMenuCategories()
        {
            try
            {

                DataTable table = dataLayer.Getfromdb("MenuCategory_GetCategory");

                List<CategoryModel> categories = new List<CategoryModel>();
                foreach (DataRow row in table.Rows)
                {
                    CategoryModel category = new CategoryModel
                    {
                        CategoryId = Convert.ToInt32(row["category_id"]),
                        CategoryName = row["category_name"].ToString(),
                        CategoryDescription = row["category_description"].ToString(),
                        CategoryImageBase64 = Convert.ToBase64String(row["category_image"] as byte[])
                    };

                    categories.Add(category);
                }

                return Ok(categories);
            }
            catch (Exception ex)
            {
                new LogHelper().LogError("Error retrieving menu categories: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }


}
