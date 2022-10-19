using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterDetail.Models
{
    public class Detalle
    {
        [Key, Column(Order = 0)]
        public int FactNum { get; set; }

        [Key, Column(Order = 1)]
        public string Producto { get; set; }

        public int Cantidad { get; set; }

        public decimal Precio { get; set; }

        public virtual Maestro? Maestro { get; set; }

    }
}
