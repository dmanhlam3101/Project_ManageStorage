using ManageStorage.Models;

namespace ManageStorage.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? UnitId { get; set; }
        public int? SupplierId { get; set; }
        public bool? Status { get; set; }

        public  SupplierDTO Supplier { get; set; }
        public  UnitDTO Unit { get; set; }


    }
}
