using System;
using System.Collections.Generic;
using System.Web.Mvc;
using ReminderApp.Models;

namespace ReminderApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SetReminder(Reminder reminder)
        {
            // In a real application, you would save the reminder to a database
            // For simplicity, we're just returning a success message
            return Json(new { success = true, message = "Reminder set successfully!" });
        }
    }
}
