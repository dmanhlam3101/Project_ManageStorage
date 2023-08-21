using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InputStorageController : ControllerBase
    {
        private QuanlykhoContext _context;
        public InputStorageController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.InputStorages.ToList());
        }

        [HttpGet("GetInputByInputId/{id}")]
        public IActionResult GetInputByInputId(int id)
        {
            return Ok(_context.InputStorages.Where(o => o.InputId == id).ToList());
        }

        [HttpPost("add")]
        public IActionResult Add(InputStorage input)
        {
            try
            {
                _context.InputStorages.Add(input);
                int result = _context.SaveChanges();
                return Ok(input);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(InputStorage input, int id)
        {
            try
            {
                var us = _context.InputStorages.FirstOrDefault(o => o.InputId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.ProductId = input.ProductId;
                    us.Quantity = input.Quantity;
                    us.DateInput = input.DateInput;
                    us.InputPrice = input.InputPrice;
                    us.OutputPrice = input.OutputPrice;
                    us.Status = input.Status;

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
                InputStorage input = _context.InputStorages.FirstOrDefault(u => u.InputId == id);

                if (input is null)
                {
                    return NotFound();
                }
                else
                {
                    input.Status = false;

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
