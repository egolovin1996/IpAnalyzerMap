using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpStackLocationProvider : BaseApiLocationProvider
    {
        public override string Name => "ipstack.com";

        protected override string BaseUrl => "http://api.ipstack.com/";

        protected override string EndPart => "?access_key=45615ce2ccb1a971cb445ab2633d793f";

        public IpStackLocationProvider(HttpClient httpClient) : base(httpClient) { }

        protected override Location GetLocationFromJson(JObject jObject)
        {
            return new Location()
            {
                Name = jObject["city"].Value<string>() + "("+ jObject["country_name"].Value<string>() + ")",
                Latitude = jObject["latitude"].Value<double>(),
                Longitude = jObject["longitude"].Value<double>()
            };
        }
    }
}
