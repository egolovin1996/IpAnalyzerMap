using System.Net.Http;
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
                Latitude = jObject["latitude"].Value<double>(),
                Longitude = jObject["longitude"].Value<double>()
            };
        }
    }
}
