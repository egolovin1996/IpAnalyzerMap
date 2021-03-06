using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpDataLocationProvider : BaseApiBaseLocationProvider
    {
        protected override string Name => "ipdata.co";
        protected override string BaseUrl => "https://api.ipdata.co/";
        protected override string EndPart => "?api-key=f23aa8e16ff9b86c5a68b9f750d21e2abc4df066a59f637ffb790579";
        
        public IpDataLocationProvider(HttpClient httpClient) : base(httpClient) { }
        
        protected override Location GetLocationFromJson(JObject jObject)
        {
            return new Location()
            {
                City = jObject["city"].Value<string>(),
                Country = jObject["country_name"].Value<string>(),
                Latitude = jObject["latitude"].Value<double>(),
                Longitude = jObject["longitude"].Value<double>(),
            };
        }
    }
}