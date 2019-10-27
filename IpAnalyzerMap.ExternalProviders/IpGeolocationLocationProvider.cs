using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpGeolocationLocationProvider : BaseApiBaseLocationProvider
    {
        protected override string Name => "ipgeolocation.com";
        protected override string BaseUrl => "https://ipgeolocation.com/";
        protected override string EndPart => "?json=1";
        
        public IpGeolocationLocationProvider(HttpClient httpClient) : base(httpClient) { }
        protected override Location GetLocationFromJson(JObject jObject)
        {
            var location = jObject["coords"].Value<string>().Split(',');
            return new Location()
            {
                City = jObject["city"]?.Value<string>(),
                Country = jObject["country"].Value<string>(),
                Latitude = double.Parse(location[0], System.Globalization.CultureInfo.InvariantCulture),
                Longitude = double.Parse(location[1], System.Globalization.CultureInfo.InvariantCulture)
            };
        }
    }
}