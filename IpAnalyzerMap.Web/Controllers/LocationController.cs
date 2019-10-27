using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Microsoft.AspNetCore.Mvc;

namespace IpAnalyzerMap.Web.Controllers
{
    public class LocationController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private static IpApiLocationProvider t1 = null;

        public LocationController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("api/location/getAllLocations/{ipAddress}")]
        public async Task<IEnumerable<Location>> GetAllLocations(string ipAddress)
        {
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
