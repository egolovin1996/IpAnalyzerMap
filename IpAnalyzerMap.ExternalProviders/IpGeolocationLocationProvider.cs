using System.Net.Http;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpGeolocationLocationProvider : BaseApiLocationProvider
    {
        public override string Name => "ipgeolocation.com";
        protected override string BaseUrl => "https://ipgeolocation.com/";
        protected override string EndPart => "?json=1";
        
        public IpGeolocationLocationProvider(HttpClient httpClient) : base(httpClient) { }
        protected override Location GetLocationFromJson(JObject jObject)
        {
            string city = "";
            try
            {
                city = jObject["city"].Value<string>();
            }
            catch
            {
                city = "Not Found";
            }
            
            var location = jObject["coords"].Value<string>().Split(',');
            
            return new Location()
            {
                Name = $"Country: {jObject["country"].Value<string>()} City: {city}",
                Latitude = double.Parse(location[0], System.Globalization.CultureInfo.InvariantCulture),
                Longitude = double.Parse(location[1], System.Globalization.CultureInfo.InvariantCulture)
            };
        }
    }
}