using Microsoft.AspNetCore.Mvc;

namespace DinePulse_API.Controllers.CustomerWebsiteControllers
{
    public class OrderPlacementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
