using ManageStorage.Models;

namespace ManageStorage.DTO
{
    public class StorageDTO
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? quantity { get; set; }
        public string? unitName { get; set; }

        public SupplierDTO Supplier { get; set; }
    }
}
