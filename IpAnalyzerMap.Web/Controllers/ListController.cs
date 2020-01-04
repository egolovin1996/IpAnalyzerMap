using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IpAnalyzerMap.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace IpAnalyzerMap.Web.Controllers
{
    public class ListController : Controller
    {
        public class Result
        {
            public string Name { get; set; }
            public string Range { get; set; }
        }
        
        private readonly IListService _listService;
        
        public ListController(IListService listService)
        {
            _listService = listService;
        }

        [HttpGet("api/list/all")]
        public async Task<List<Result>> All()
        {
            var list = await _listService.All();
            var result = list.Select(i => 
                new Result() { Name = i.Name, Range = i.Range }).ToList();
            
            return result;
        }
        
        [HttpPost("api/list/add/{name}/{range}")]
        public async void Add(string name, string range)
        {
           await _listService.Add(name, range);
        }
        
        [HttpPost("api/list/remove/{name}")]
        public async void Add(string name)
        {
            await _listService.Remove(name);
        }
    }
}