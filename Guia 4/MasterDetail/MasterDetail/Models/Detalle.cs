using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterDetail.Models
{
    public class Detalle
    {
        [Key, Column(Order = 0)]
        public int FactNum { get; set; }

        [Key, Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DetalleNum { get; set; }

        public string Productos { get; set; }

        public string Cantidades { get; set; }

        public string Precios { get; set; }

        public decimal Total { get; set; }

        public int IdMaster { get; set; }

        public virtual Maestro? Maestro { get; set; }

    }
}
