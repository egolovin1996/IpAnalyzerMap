using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpInfoLocationProvider : BaseApiLocationProvider
    {
        public override string Name => "ipinfo.io";

        protected override string BaseUrl => "https://ipinfo.io/";
        protected override string EndPart => "/geo";

        public IpInfoLocationProvider(HttpClient httpClient) : base(httpClient) { }

        protected override Location GetLocationFromJson(JObject jObject)
        {
            var location = jObject["loc"].Value<string>().Split(',');

            var result = new Location()
            {
                Name = $"{jObject["city"].Value<string>()} ({jObject["country"].Value<string>()})",
                Latitude = double.Parse(location[0], System.Globalization.CultureInfo.InvariantCulture),
                Longitude = double.Parse(location[1], System.Globalization.CultureInfo.InvariantCulture)
            };

            return result;
        }
    }
}
