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
    public class OutputStorageController : ControllerBase
    {
        private QuanlykhoContext _context;
        public OutputStorageController(QuanlykhoContext context)
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

            var output = _context.OutputStorages.Include(o => o.Product).Include(o => o.Customer).Where(o => o.Status != false).OrderByDescending(o => o.DateOutput).ToList();
            var json = JsonConvert.SerializeObject(output, jsonSettings);

            return Ok(json);
        }

        [HttpGet("todaysale")]
        public IActionResult sale()
        {
            DateTime now =  DateTime.Now.Date;
            DateTime targetDate = new DateTime(2023, 8, 30);
            DateTime targetDate2 = new DateTime(2023, 8, 23);
            var input = _context.OutputStorages
                .Include(o => o.Product) // Include the related Product
                .Where(o => o.DateOutput <= targetDate && o.DateOutput >= targetDate2).OrderByDescending(o => o.DateOutput)
                .ToList();

            List<OutputTransaction> outputTransactions = new List<OutputTransaction>();
            foreach (var i in input)
            {
                var price = _context.InputStorages
                  .Where(o => o.ProductId == i.ProductId && i.Quantity > 0)
                  .OrderBy(o => o.DateInput) // Assuming DateInput indicates the entry date
                  .Select(o => o.OutputPrice) // Assuming OutputPrice is the price you want to use
                  .FirstOrDefault();
                OutputTransaction transaction = new OutputTransaction();
                transaction.OutputId = i.OutputId;
                transaction.ProductId = i.ProductId;
                transaction.DateOutput = i.DateOutput;
                transaction.PriceOutputTransaction = i.Quantity * price;
                transaction.Quantity = i.Quantity;

                if (i.Product != null) // Make sure Product is loaded
                {
                    transaction.Product = new ProductDTO
                    {
                        ProductId = i.Product.ProductId,
                        ProductName = i.Product.ProductName
                    };
                }

                outputTransactions.Add(transaction);
            }
            var todayTransactions = outputTransactions.Where(o => o.DateOutput.Value.Date == now).ToList();
            int totalSale = todayTransactions.Sum(i => (int)i.PriceOutputTransaction);
            DashBoard dashBoard = new DashBoard
            {
                totalToday = totalSale,
            };
            return Ok(dashBoard);
        }
        [HttpGet("getOutputTransaction")]
        public IActionResult ListTransaction()
        {
            DateTime targetDate = new DateTime(2023, 8, 30);
            DateTime targetDate2 = new DateTime(2023, 8, 23);
            var input = _context.OutputStorages
                .Include(o => o.Product) // Include the related Product
                .Where(o => o.DateOutput <= targetDate && o.DateOutput >= targetDate2).OrderByDescending(o => o.DateOutput)
                .ToList();

            List<OutputTransaction> outputTransactions = new List<OutputTransaction>();
            foreach (var i in input)
            {
                var price = _context.InputStorages
                  .Where(o => o.ProductId == i.ProductId && i.Quantity >0)
                  .OrderBy(o => o.DateInput) // Assuming DateInput indicates the entry date
                  .Select(o => o.OutputPrice) // Assuming OutputPrice is the price you want to use
                  .FirstOrDefault();
                OutputTransaction transaction = new OutputTransaction();
                transaction.OutputId = i.OutputId;
                transaction.ProductId = i.ProductId;
                transaction.DateOutput = i.DateOutput;
                transaction.PriceOutputTransaction = i.Quantity * price ;
                transaction.Quantity = i.Quantity;

                if (i.Product != null) // Make sure Product is loaded
                {
                    transaction.Product = new ProductDTO
                    {
                        ProductId = i.Product.ProductId,
                        ProductName = i.Product.ProductName
                    };
                }

                outputTransactions.Add(transaction);
            }

            return Ok(outputTransactions);
        }
        [HttpGet("GetOutputByOutputId/{id}")]
        public IActionResult GetOutputByOutputId(int id)
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            var output = _context.OutputStorages.Include(o => o.Product).Include(o => o.Customer).Include(o => o.Product.Unit).Where(o => o.OutputId == id).ToList();
            var json = JsonConvert.SerializeObject(output, jsonSettings);

            return Ok(json);
        }

        [HttpPost("add")]
        public IActionResult Add(OutputStorage output)
        {
            try
            {
                _context.OutputStorages.Add(output);
                int result = _context.SaveChanges();
                return Ok(output);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(OutputStorage output, int id)
        {
            try
            {
                var us = _context.OutputStorages.FirstOrDefault(o => o.OutputId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.CustomerId = output.CustomerId;
                    us.ProductId = output.ProductId;
                    us.Quantity = output.Quantity;
                    us.DateOutput = output.DateOutput;
                    us.Status = output.Status;

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
                OutputStorage output = _context.OutputStorages.FirstOrDefault(u => u.OutputId == id);

                if (output is null)
                {
                    return NotFound();
                }
                else
                {
                    output.Status = false;

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
