using MasterDetail.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
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
            List<string> precios = detalle.Precios.Split(',').Reverse().ToList();
            List<string> cantidades = detalle.Cantidades.Split(',').Reverse().ToList();
            decimal total = 0;
            for (var i = 0; i < precios.Count; i++)
            {
                int precio = Int32.Parse(precios[i]) * Int32.Parse(cantidades[i]);
                total += precio;
            }
            detalle.Total = total;
            detalle.Fecha = DateTime.Now;
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

        public IActionResult Listar()
        {
            var result = db.MasterVtas?.ToList();
            return View(result);
        }

        public IActionResult UpdateDetail(int DetalleNum) {
            Detalle detalle = db.DetalleVta.SqlQuery("select * from dbo.Detalles where dbo.Detalles.DetalleNum = @DetalleNum;",
                new SqlParameter("@DetalleNum", DetalleNum)).FirstOrDefault();

            return View(detalle);

        }

        [HttpPost]
        public IActionResult UpdateDetail(Detalle detalle)
        {
            Maestro maestro = db.MasterVtas.Find(detalle.IdMaster);
            detalle.Maestro = maestro;
            List<string> precios = detalle.Precios.Split(',').Reverse().ToList();
            List<string> cantidades = detalle.Cantidades.Split(',').Reverse().ToList();
            decimal total = 0;
            for (var i = 0; i < precios.Count; i++)
            {
                int precio = Int32.Parse(precios[i]) * Int32.Parse(cantidades[i]);
                total += precio;
            }
            detalle.Total = total;
            detalle.Fecha = DateTime.Now;
            db.DetalleVta.AddOrUpdate(detalle);
            db.SaveChanges();
            return RedirectToAction("List");

        }

        public IActionResult DeleteDetail(int DetalleNum)
        {
            Detalle detalle = db.DetalleVta.SqlQuery("select * from dbo.Detalles where dbo.Detalles.DetalleNum = @DetalleNum;",
                new SqlParameter("@DetalleNum", DetalleNum)).FirstOrDefault();
            db.DetalleVta.Remove(detalle);
            db.SaveChanges();
            return RedirectToAction("List");
        }

        public IActionResult DeleteMaster(int FactNum)
        {
            Maestro maestro = db.MasterVtas.SqlQuery("select * from dbo.Maestroes where dbo.Maestroes.FactNum = @FactNum;",
                new SqlParameter("@FactNum", FactNum)).FirstOrDefault();
            db.MasterVtas.Remove(maestro);
            db.SaveChanges();
            return RedirectToAction("Listar");
        }

        public IActionResult CreateMasterView()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}