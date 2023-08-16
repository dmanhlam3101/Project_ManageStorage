using System;
using System.Collections.Generic;

namespace ManageStorage.Models
{
    public partial class InputStorage
    {
        public int InputId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? DateInput { get; set; }
        public double? InputPrice { get; set; }
        public double? OutputPrice { get; set; }
        public bool? Status { get; set; }

        public virtual Product? Product { get; set; }
    }
}
