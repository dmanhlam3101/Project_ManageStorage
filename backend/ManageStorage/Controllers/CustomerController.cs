using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private QuanlykhoContext _context;
        public CustomerController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.Customers.ToList());
        }

        [HttpPost("add")]
        public IActionResult Add(Customer cus)
        {
            try
            {
                _context.Customers.Add(cus);
                int result = _context.SaveChanges();
                return Ok(cus);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(Customer cus, int id)
        {
            try
            {
                var us = _context.Customers.FirstOrDefault(o => o.CustomerId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.DisplayName = cus.DisplayName;
                    us.Address = cus.Address;
                    us.Phone = cus.Phone; 
                    us.Email = cus.Email;
                    us.MoreInfo = cus.MoreInfo;
                    us.ContractDate = cus.ContractDate;
                    us.Status = cus.Status;

                    int result = _context.SaveChanges();
                    return Ok(result);
                }
            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                Customer cus = _context.Customers.FirstOrDefault(u => u.CustomerId == id);

                if (cus is null)
                {
                    return NotFound();
                }
                else
                {
                    cus.Status = false;

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
