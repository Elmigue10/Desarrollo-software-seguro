using MasterDetail.Models;
using System.Data.Entity;

namespace MasterDetail.Models
{
    public class MDContext : DbContext
    {

        public DbSet<Maestro>? MasterVtas { get; set; }
        public DbSet<Detalle>? DetalleVta { get; set; }

    }
}
