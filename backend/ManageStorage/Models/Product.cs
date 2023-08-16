using System;
using System.Collections.Generic;

namespace ManageStorage.Models
{
    public partial class Product
    {
        public Product()
        {
            InputStorages = new HashSet<InputStorage>();
            OutputStorages = new HashSet<OutputStorage>();
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? UnitId { get; set; }
        public int? SupplierId { get; set; }
        public bool? Status { get; set; }

        public virtual Supplier? Supplier { get; set; }
        public virtual Unit? Unit { get; set; }
        public virtual ICollection<InputStorage> InputStorages { get; set; }
        public virtual ICollection<OutputStorage> OutputStorages { get; set; }
    }
}
