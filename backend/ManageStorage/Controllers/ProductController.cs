using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private QuanlykhoContext _context;
        public ProductController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            var product = _context.Products
                .Include(p => p.InputStorages)
                .Include(p => p.OutputStorages).ToList();
            var json = JsonConvert.SerializeObject(product, jsonSettings);

            return Ok(json);
        }

        [HttpGet("GetProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            var product = _context.Products
                .Include(p => p.InputStorages)
                .Include(p => p.OutputStorages)
                .Where(o => o.ProductId == id).ToList();

            var json = JsonConvert.SerializeObject(product, jsonSettings);
            return Ok(json);
        }

        [HttpPost("add")]
        public IActionResult Add(Product pro)
        {
            try
            {
                _context.Products.Add(pro);
                int result = _context.SaveChanges();
                return Ok(pro);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(Product pro, int id)
        {
            try
            {
                var us = _context.Products.FirstOrDefault(o => o.ProductId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.ProductName = pro.ProductName;
                    us.UnitId = pro.UnitId;
                    us.SupplierId = pro.SupplierId;
                    us.Status = pro.Status;

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
                Product pro = _context.Products.FirstOrDefault(u => u.ProductId == id);

                if (pro is null)
                {
                    return NotFound();
                }
                else
                {
                    pro.Status = false;

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
