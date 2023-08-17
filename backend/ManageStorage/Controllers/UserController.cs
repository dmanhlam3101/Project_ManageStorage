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
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.Users.ToList());
        }

        [HttpPost]
        public IActionResult Add(User user)
        {
            try
            {
                _context.Users.Add(user);
                int result = _context.SaveChanges();
                return Ok(result);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut]
        public IActionResult EditUser(User user)
        {
            try
            {
                var us = _context.Users.FirstOrDefault(o => o.UserId == user.UserId);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.DisplayName = user.DisplayName;
                    us.Username = user.Username;
                    us.Password = user.Password;
                    us.Role = user.Role;
                    us.Status = user.Status;

                    int result = _context.SaveChanges();
                    return Ok(result);
                }
            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut]
        public IActionResult Delete(int id)
        {
            try
            {
                User user = _context.Users.FirstOrDefault(u => u.UserId == id);

                if (user is null)
                {
                    return NotFound();
                }
                else
                {
                    user.Status = false;

                    int result = _context.SaveChanges();
                    return Ok(result);
                }
            }
            catch
            {
                return Conflict();
            }
        }
    }
}
