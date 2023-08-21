using AutoMapper;
using ManageStorage.DTO;
using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
<<<<<<< HEAD
using Newtonsoft.Json;
=======
using System.IO;
>>>>>>> e33d5c8d3deabdfa9ad84ecd1b4ab04598d37eda
=======
using System.IO;
>>>>>>> e33d5c8d3deabdfa9ad84ecd1b4ab04598d37eda

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private QuanlykhoContext _context;
        private IMapper _mapper;
        public ProductController(QuanlykhoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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


        [HttpGet("{id}")]
        public IActionResult getProductById(int id)
        {
            var product = _context.Products.Include(o => o.Supplier).Include(s => s.Unit).FirstOrDefault(p => p.ProductId == id);

            ProductDTO productDTO = new ProductDTO();
            productDTO.ProductId = product.ProductId;
            productDTO.ProductName = product.ProductName;
            productDTO.UnitId = product.UnitId;
            productDTO.SupplierId = product.SupplierId;
            productDTO.Status = product.Status;
            if (product.Supplier != null)
            {
                productDTO.Supplier = new SupplierDTO
                {
                   SupplierId = product.Supplier.SupplierId,
                    DisplayName = product.Supplier.DisplayName,
                };
            } 
            if (product.Unit != null)
            {
                productDTO.Unit = new UnitDTO
                {
                   UnitId = product.Unit.UnitId,
                    UnitName = product.Unit.UnitName,
                };
            }

            return Ok(productDTO);
        }


        [HttpGet("{id}")]
        public IActionResult getProductById(int id)
        {
            var product = _context.Products.Include(o => o.Supplier).Include(s => s.Unit).FirstOrDefault(p => p.ProductId == id);

            ProductDTO productDTO = new ProductDTO();
            productDTO.ProductId = product.ProductId;
            productDTO.ProductName = product.ProductName;
            productDTO.UnitId = product.UnitId;
            productDTO.SupplierId = product.SupplierId;
            productDTO.Status = product.Status;
            if (product.Supplier != null)
            {
                productDTO.Supplier = new SupplierDTO
                {
                   SupplierId = product.Supplier.SupplierId,
                    DisplayName = product.Supplier.DisplayName,
                };
            } 
            if (product.Unit != null)
            {
                productDTO.Unit = new UnitDTO
                {
                   UnitId = product.Unit.UnitId,
                    UnitName = product.Unit.UnitName,
                };
            }

            return Ok(productDTO);
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
