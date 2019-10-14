using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Interfaces;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders.Base
{
    public abstract class BaseApiLocationProvider : ILocationProvider
    {
        public abstract string Name { get; }

        protected abstract string BaseUrl { get; }
        protected abstract string EndPart { get; }

        private readonly HttpClient _httpClient;

        protected BaseApiLocationProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Location> GetLocationByIp(string ipAddress)
        {
            var url = $"{BaseUrl}{ipAddress}{EndPart}";

            var t = _httpClient.GetStringAsync(url).Result;
            var responseString = await _httpClient.GetStringAsync(url);
            var jsonResult = (JObject)JsonConvert.DeserializeObject(responseString);

            return GetLocationFromJson(jsonResult);
        }

        protected abstract Location GetLocationFromJson(JObject jObject);
    }
}
