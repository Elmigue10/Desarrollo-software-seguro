using MasterDetail.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Xml.Linq;

namespace MasterDetail.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private MDContext db = new MDContext();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult List()
        {
            var result = db.DetalleVta?.ToList();
            return View(result);
        }

        [HttpPost]
        public IActionResult Save(Detalle detalle) {
            Maestro maestro = db.MasterVtas.Find(detalle.IdMaster);
            detalle.Maestro = maestro;
            detalle.Total = 100;
            db.DetalleVta.Add(detalle);
            db.SaveChanges();
            return RedirectToAction("List");
        }

        [HttpPost]
        public IActionResult SaveMaster(Maestro maestro)
        {
            maestro.Fecha = DateTime.Now;
            maestro.Referencia = "Vendedor";
            db.MasterVtas.Add(maestro);
            db.SaveChanges();
            return RedirectToAction("Listar");
        }

        public IActionResult CreateMasterView()
        {
            return View();
        }

        public IActionResult Listar()
        {
            var result = db.MasterVtas?.ToList();
            return View(result);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}