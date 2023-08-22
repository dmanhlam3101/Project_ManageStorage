﻿using ManageStorage.Models;
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

            var output = _context.OutputStorages.Include(o => o.Product).Where(o => o.Status != false).ToList();
            var json = JsonConvert.SerializeObject(output, jsonSettings);

            return Ok(json);
        }

        [HttpGet("GetOutputByOutputId/{id}")]
        public IActionResult GetOutputByOutputId(int id)
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            var output = _context.OutputStorages.Where(o => o.OutputId == id).ToList();
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
