using System.ComponentModel.DataAnnotations;

namespace MasterDetail.Models
{
    public class Maestro
    {

        [Key]
        public int FactNum { get; set; }
        public string Referencia { get; set; }

        public string Vendedor { get; set; }

        public DateTime Fecha { get; set; }

        public virtual ICollection<Detalle>? DetalleVta { get; set; }

    }
}
