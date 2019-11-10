using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class ShodanLocationProvider: BaseApiBaseLocationProvider
    {
        protected override string Name => "shodan.io";

        protected override string EndPart => "?key=UVbsoTHp2aLWrePvAdUPGYApIF39S8o4";
        protected override string BaseUrl => "https://api.shodan.io/shodan/host/";
        
        public ShodanLocationProvider(HttpClient httpClient): base(httpClient) { }

        protected override Location GetLocationFromJson(JObject jObject)
        {
            return new Location()
            {
                Country = jObject["country_name"].Value<string>(),
                City = jObject["city"]?.Value<string>(),
                Latitude = jObject["latitude"].Value<double>(),
                Longitude = jObject["longitude"].Value<double>()
            };
        }

        public async Task<ScanResult> GetScanResult(string ipAddress)
        {
            var result = new ScanResult();
            try
            {
                var jObject = await GetJsonResult(ipAddress);
                result.Isp = jObject["isp"]?.Value<string>();
                result.Organization = jObject["org"]?.Value<string>();
                result.LastUpdateDate = jObject["last_update"]?.Value<string>();
                result.Tags = jObject["tags"]?.Values<string>().ToList();
                result.Ports = jObject["ports"]?.Values<int>().ToList();
                result.Vulnerabilities = jObject["vulns"]?.Values<string>().ToList();
            }
            catch
            {
                //ignore
            }

            return result;
        }
    }
}
