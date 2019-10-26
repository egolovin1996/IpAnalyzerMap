using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpGeolocationApiLocationProvider : BaseApiBaseLocationProvider
    {
        protected override string Name => "ipgeolocationapi.com";

        protected override string BaseUrl => "https://api.ipgeolocationapi.com/geolocate/";

        protected override string EndPart => "";

        public IpGeolocationApiLocationProvider(HttpClient httpClient) : base(httpClient) { }

        protected override Location GetLocationFromJson(JObject jObject)
        {
            var jGeo = jObject["geo"];
            return new Location()
            {
                Country = jObject["name"].Value<string>(),
                Latitude = jGeo["latitude"].Value<double>(),
                Longitude = jGeo["longitude"].Value<double>()
            };
        }
    }
}
