using MasterDetail.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace MasterDetail.Controllers
{
    public class MasterDetailController : Controller
    {
        private MDContext db = new MDContext();

        // GET: /MasterDetail/
        public ViewResult index(){
            return View();
        }

        // GET: /MasterDetai/Details/
        public ViewResult details(int id) {
            Maestro? maestro = db.MasterVtas?.Find(id);
            return View(maestro);
        }

        // POST: /MasterDetail/Create
        public ActionResult create() { 
            return View();
        }

        [HttpPost]
        public JsonResult create(Maestro maestro) {

            try
            {
                if (ModelState.IsValid)
                {
                    if (maestro.FactNum > 0)
                    {
                        var CurrentDetalleVta = db.DetalleVta?.Where(p => p.FactNum == maestro.FactNum);

                        foreach (Detalle ss in CurrentDetalleVta)
                        {
                            db.DetalleVta?.Remove(ss);
                        }

                        foreach (Detalle ss in maestro.DetalleVta)
                        {
                            db.DetalleVta?.Add(ss);
                        }

                        db.Entry(maestro).State = EntityState.Modified;
                    }
                }
                else
                {
                    db.MasterVtas.Add(maestro);
                }
                db.SaveChanges();
            }
            catch (Exception ex) {
                return Json(new { Success = 0, ex = ex.Message.ToString() });
            }

            return Json(new { Success = 0, ex = new Exception("No se pudo almacenar").Message.ToString() });
        }

        // GET: /MasterDetail/Update/
        public ActionResult update(int id) {
            ViewBag.Title = "Update";
            Maestro maestro = db.MasterVtas.Find(id);
            return View("Create", maestro);
        }
    
        // GET: /MasterDetail/Delete/
        public ActionResult delete(int id)
        {
            Maestro maestro = db.MasterVtas.Find(id);
            return View(maestro);
        }

        // POST: /MasterDetail/Delete/
        [HttpPost, ActionName("Delete")]
        public ActionResult deleteConfirmed(int id)
        {
            Maestro maestro = db.MasterVtas.Find(id);
            db.MasterVtas.Remove(maestro);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
