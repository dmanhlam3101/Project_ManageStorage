using ManageStorage.Models;

namespace ManageStorage.DTO
{
    public class InputTransaction
    {
        public int InputId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? DateInput { get; set; }
        public double? InputPrice { get; set; }
        public double? PriceTransaction { get; set; }
        public double? OutputPrice { get; set; }


        public virtual ProductDTO? Product { get; set; }
    }
}
