using System;
using System.Collections.Generic;

namespace ManageStorage.Models
{
    public partial class Customer
    {
        public Customer()
        {
            OutputStorages = new HashSet<OutputStorage>();
        }

        public int CustomerId { get; set; }
        public string? DisplayName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? MoreInfo { get; set; }
        public DateTime? ContractDate { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<OutputStorage> OutputStorages { get; set; }
    }
}
