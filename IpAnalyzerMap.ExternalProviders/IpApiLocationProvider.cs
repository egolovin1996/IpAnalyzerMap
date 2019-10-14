using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpApiLocationProvider: BaseApiLocationProvider
    {
        public override string Name => "ip-api.com";
        protected override string BaseUrl => "http://ip-api.com/json/";
        protected override string EndPart => "";
        
        public IpApiLocationProvider(HttpClient httpClient) : base(httpClient) { }
        
        protected override Location GetLocationFromJson(JObject jObject)
        {
            var name = $"Country: {jObject["country"].Value<string>()}," +
                       $" City: {jObject["city"].Value<string>()}";
            
            return new Location()
            {
                Name = name,
                Latitude = jObject["lat"].Value<double>(),
                Longitude = jObject["lon"].Value<double>()
            };
        }
    }
}