using System;
using System.Collections.Generic;

namespace ManageStorage.Models
{
    public partial class OutputStorage
    {
        public int OutputId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? DateOutput { get; set; }
        public bool? Status { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual Product? Product { get; set; }
    }
}
