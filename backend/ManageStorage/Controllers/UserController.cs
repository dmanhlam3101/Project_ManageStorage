using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private QuanlykhoContext _context;
        public UserController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery] //kich hoat OData
        public IActionResult List()
        {
            return Ok(_context.Users.ToList());
        }
    }
}
