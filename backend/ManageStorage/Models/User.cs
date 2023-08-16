using System;
using System.Collections.Generic;

namespace ManageStorage.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string? DisplayName { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public bool? Status { get; set; }
    }
}
