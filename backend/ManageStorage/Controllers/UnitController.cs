using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private QuanlykhoContext _context;
        public UnitController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.Units.ToList());
        }

        [HttpPost("add")]
        public IActionResult Add(Unit unit)
        {
            try
            {
                _context.Units.Add(unit);
                int result = _context.SaveChanges();
                return Ok(unit);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(Unit unit, int id)
        {
            try
            {
                var us = _context.Units.FirstOrDefault(o => o.UnitId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.UnitName = unit.UnitName;
                    us.Status = unit.Status;

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
                Unit unit = _context.Units.FirstOrDefault(u => u.UnitId == id);

                if (unit is null)
                {
                    return NotFound();
                }
                else
                {
                    unit.Status = false;

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
