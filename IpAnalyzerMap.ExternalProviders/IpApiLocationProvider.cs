using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpApiLocationProvider : BaseApiBaseLocationProvider
    {
        protected override string Name => "ip-api.com";
        protected override string BaseUrl => "http://ip-api.com/json/";
        protected override string EndPart => "";
        
        public IpApiLocationProvider(HttpClient httpClient) : base(httpClient) { }
        
        protected override Location GetLocationFromJson(JObject jObject)
        {
            return new Location()
            {
                City = jObject["city"].Value<string>(),
                Country = jObject["country"].Value<string>(),
                Latitude = jObject["lat"].Value<double>(),
                Longitude = jObject["lon"].Value<double>()
            };
        }
    }
}