using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private QuanlykhoContext _context;
        public IConfiguration _configuration;
        public UserController(IConfiguration configuration, QuanlykhoContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.Users.Where(o => o.Status != false).ToList());
        }

        [HttpGet("GetUserByUserId/{id}")]
        [EnableQuery]
        public IActionResult GetUserByUserId(int id)
        {
            return Ok(_context.Users.Where(o => o.UserId == id).ToList());
        }

        [HttpPost("add")]
        public IActionResult Add(User user)
        {
            try
            {
                _context.Users.Add(user);
                int result = _context.SaveChanges();
                return Ok(user);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(User user, int id)
        {
            try
            {
                var us = _context.Users.FirstOrDefault(o => o.UserId == id);

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

        [HttpPut("delete/{id}")]
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

        [HttpPost("login")]
        public async Task<IActionResult> Post(User _userData)
        {
            if (_userData != null && _userData.Username != null && _userData.Password != null)
            {
                var user = await GetUser(_userData.Username, _userData.Password);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub,user.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.UserId.ToString()),
                        new Claim("DisplayName", user.DisplayName),
                        new Claim("Role", user.Role),
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<User> GetUser(string username, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }
    }
}
