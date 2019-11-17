using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using IpAnalyzerMap.Web.Resources.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IpAnalyzerMap.Web.Controllers
{
    public class LocationController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ICvesProvider  _cvesProvider;

        public LocationController(IHttpClientFactory httpClientFactory, ICvesProvider cvesProvider)
        {
            _httpClientFactory = httpClientFactory;
            _cvesProvider = cvesProvider;
        }

        [HttpGet("api/location/getScanResult/{query}")]
        public async Task<ScanResult> GetScanResult(string query)
        {
            var ipAddress = query.Count(c => c == '.') == 3
                ? query
                : System.Net.Dns.GetHostAddresses(query).First().ToString();
            
            var provider = new ShodanLocationProvider(_httpClientFactory.CreateClient());
            return await provider.GetScanResult(ipAddress, _cvesProvider.GetLink);
        }

        [HttpGet("api/location/getAllLocations/{query}")]
        public async Task<IEnumerable<Location>> GetAllLocations(string query)
        {
            var ipAddress = query.Count(c => c == '.') == 3
                ? query
                : System.Net.Dns.GetHostAddresses(query).First().ToString();
            
            
            var providers = new List<BaseLocationProvider>
            {
                new IpStackLocationProvider(_httpClientFactory.CreateClient()),
                new IpInfoLocationProvider(_httpClientFactory.CreateClient()),
                new ShodanLocationProvider(_httpClientFactory.CreateClient()),
                //new MyIpLocationProvider(_httpClientFactory.CreateClient()),
                new IpApiLocationProvider(_httpClientFactory.CreateClient()),
                new IpGeolocationLocationProvider(_httpClientFactory.CreateClient()),
                new IpDataLocationProvider(_httpClientFactory.CreateClient()),
                new IpGeoLocationIoLocationProvider(),
                new IpIfyLocationProvider(_httpClientFactory.CreateClient()),
                new IpGeolocationApiLocationProvider(_httpClientFactory.CreateClient()),
            };
            var result = new List<Location>();

            foreach (var provider in providers)
            {
                try
                {
                    result.Add(await provider.GetLocationByIp(ipAddress.Trim()));
                }
                catch
                {
                    //ignore
                }
            }

            return result;
        }
    }
}
