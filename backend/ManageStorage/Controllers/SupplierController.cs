﻿using ManageStorage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace ManageStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private QuanlykhoContext _context;
        public SupplierController(QuanlykhoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult List()
        {
            return Ok(_context.Suppliers.ToList());
        }

        [HttpPost("add")]
        public IActionResult Add(Supplier sup)
        {
            try
            {
                _context.Suppliers.Add(sup);
                int result = _context.SaveChanges();
                return Ok(sup);

            }
            catch
            {
                return Conflict();
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditUser(Supplier sup, int id)
        {
            try
            {
                var us = _context.Suppliers.FirstOrDefault(o => o.SupplierId == id);

                if (us is null)
                {
                    return NotFound();
                }
                else
                {
                    us.DisplayName = sup.DisplayName;
                    us.Address = sup.Address;
                    us.Phone = sup.Phone;
                    us.Email = sup.Email;
                    us.MoreInfo = sup.MoreInfo;
                    us.ContractDate = sup.ContractDate;
                    us.Status = sup.Status;

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
                Supplier sup = _context.Suppliers.FirstOrDefault(u => u.SupplierId == id);

                if (sup is null)
                {
                    return NotFound();
                }
                else
                {
                    sup.Status = false;

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