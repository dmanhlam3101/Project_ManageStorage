using ManageStorage.Models;

namespace ManageStorage.DTO
{
    public class UnitDTO
    {
        public int UnitId { get; set; }
        public string? UnitName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
