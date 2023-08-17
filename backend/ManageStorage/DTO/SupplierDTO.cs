namespace ManageStorage.DTO
{
    public class SupplierDTO
    {
        public int SupplierId { get; set; }
        public string? ProductName { get; set; }
        public string? DisplayName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? MoreInfo { get; set; }
        public DateTime? ContractDate { get; set; }
    }
}
