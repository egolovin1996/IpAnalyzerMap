using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders;
using IpAnalyzerMap.ExternalProviders.Interfaces;
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

        [HttpGet("api/location/getAllLocations/{ipAddress}")]
        public async Task<object[]> GetAllLocations(string ipAddress)
        {
            var providers = new List<ILocationProvider>
            {
                new IpInfoLocationProvider(_httpClientFactory.CreateClient()),
                new ShodanLocationProvider(_httpClientFactory.CreateClient())
            };
            var result = new List<object>();

            foreach (var provider in providers)
            {
                var location = await provider.GetLocationByIp(ipAddress);
                result.Add(new
                {
                    ProviderName = provider.Name,
                    Location = location
                });
            }

            return result.ToArray();
        }
    }
}
