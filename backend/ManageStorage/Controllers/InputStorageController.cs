using AutoMapper;
using ManageStorage.DTO;
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
    public class InputStorageController : ControllerBase
    {
        private QuanlykhoContext _context;
        private IMapper _mapper;
        public InputStorageController(QuanlykhoContext context, IMapper mapper)
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

            var input = _context.InputStorages.Include(o => o.Product).Where(o => o.Status != false).OrderByDescending(o => o.DateInput).ToList();
            var json = JsonConvert.SerializeObject(input, jsonSettings);

            return Ok(json);
        }
        [HttpGet("hihi")]
        public IActionResult Getz()
        {
            var price = _context.InputStorages
                   .Where(o => o.ProductId == 1)
                   .OrderBy(o => o.DateInput) // Assuming DateInput indicates the entry date // Assuming OutputPrice is the price you want to use
                   .FirstOrDefault();
            return Ok(price);
        }

        [HttpGet("getInpuTransaction")]
        public IActionResult ListTransaction()
        {
            DateTime targetDate = new DateTime(2023, 8, 30);
            DateTime targetDate2 = new DateTime(2023, 8, 23);
            var input = _context.InputStorages
                .Include(o => o.Product) // Include the related Product
                .Where(o => o.DateInput <= targetDate && o.DateInput >= targetDate2).OrderByDescending(o => o.DateInput)
                .ToList();

            List<InputTransaction> inputTransactions = new List<InputTransaction>();
            foreach (var i in input)
            {
                InputTransaction transaction = new InputTransaction();
                transaction.InputId = i.InputId;
                transaction.ProductId = i.ProductId;
                transaction.DateInput = i.DateInput;
                transaction.InputPrice = i.InputPrice;
                transaction.OutputPrice = i.OutputPrice;
                transaction.PriceTransaction = i.InputPrice * i.Quantity;
                transaction.Quantity = i.Quantity;

                if (i.Product != null) // Make sure Product is loaded
                {
                    transaction.Product = new ProductDTO
                    {
                        ProductId = i.Product.ProductId,
                        ProductName = i.Product.ProductName
                    };
                }

                inputTransactions.Add(transaction);
            }

            return Ok(inputTransactions);
        }


        [HttpGet("GetInputByInputId/{id}")]
        public IActionResult GetInputByInputId(int id)
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            var input = _context.InputStorages.Include(o => o.Product).Include(c => c.Product.Supplier).Include(u => u.Product.Unit)
                .Where(o => o.InputId == id).ToList();
            var json = JsonConvert.SerializeObject(input, jsonSettings);

            return Ok(json);
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
