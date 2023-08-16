using ManageStorage.DTO;
using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private QuanlykhoContext _context;
        public StorageController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Storage()
        {
            var products = _context.Products.Include(o => o.Supplier).ToList();
            List<StorageDTO> storage = new List<StorageDTO>();

            foreach (var product in products)
            {
                var inputProduct = _context.InputStorages.Where(o => o.ProductId == product.ProductId).ToList();
                var outputProduct = _context.OutputStorages.Where(o => o.ProductId == product.ProductId).ToList();
                var unitname = _context.Units.FirstOrDefault(o => o.UnitId == product.UnitId);

                int sumInput = 0;
                int sumOutput = 0;

                if (inputProduct != null)
                {
                    sumInput = (int)inputProduct.Sum(o => o.Quantity);
                }
                
                if (outputProduct != null)
                {
                    sumInput = (int)outputProduct.Sum(o => o.Quantity);
                }

                StorageDTO storage1 = new StorageDTO();
                storage1.ProductId = product.ProductId;
                storage1.ProductName = product.ProductName;
                storage1.quantity = sumInput - sumOutput;
                storage1.unitName = unitname.UnitName;

                if (product.Supplier != null)
                {
                    storage1.Supplier = new SupplierDTO
                    {
                        SupplierId = product.Supplier.SupplierId,
                        DisplayName = product.Supplier.DisplayName,
                        Address = product.Supplier.Address,
                        Phone = product.Supplier.Phone,
                        Email = product.Supplier.Email,
                        MoreInfo = product.Supplier.MoreInfo,
                        ContractDate = product.Supplier.ContractDate
                    };
                }

                storage.Add(storage1);
            }

            return Ok(storage);
        }
    }
}
