using ManageStorage.Models;

namespace ManageStorage.DTO
{
    public class OutputTransaction
    {
        public int OutputId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public double? PriceOutputTransaction { get; set; }
        public DateTime? DateOutput { get; set; }

        public virtual ProductDTO? Product { get; set; }
    }
}
