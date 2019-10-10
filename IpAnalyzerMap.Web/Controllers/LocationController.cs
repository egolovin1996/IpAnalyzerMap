using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders;
using IpAnalyzerMap.ExternalProviders.Models;
using Microsoft.AspNetCore.Mvc;

namespace IpAnalyzerMap.Web.Controllers
{
    public class LocationController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public LocationController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("api/location/{ipAddress}")]
        public async Task<Location> GetAverageLocation(string ipAddress)
        {
            var provider = new IpInfoLocationProvider(_httpClientFactory.CreateClient());
            var result = await provider.GetLocationByIp(ipAddress);

            var provider1 = new ShodanLocationProvider(_httpClientFactory.CreateClient());
            var result1 = await provider1.GetLocationByIp(ipAddress);

            return result;
        }

        public Task GetAllLocations()
        {
            return Task.CompletedTask;
        }
    }
}
