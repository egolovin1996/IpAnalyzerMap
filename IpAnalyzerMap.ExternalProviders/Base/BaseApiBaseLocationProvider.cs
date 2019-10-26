using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders.Base
{
    public abstract class BaseApiBaseLocationProvider : BaseLocationProvider
    {
        protected abstract override string Name { get; }

        protected abstract string BaseUrl { get; }
        protected abstract string EndPart { get; }

        private readonly HttpClient _httpClient;

        protected BaseApiBaseLocationProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        protected override async Task<Location> GetLocationByIpInner(string ipAddress)
        {
            var url = $"{BaseUrl}{ipAddress}{EndPart}";

            string responseString;
            try
            {
                responseString = await _httpClient.GetStringAsync(url);
            }
            catch(InvalidOperationException)
            {
                var bytes = await _httpClient.GetByteArrayAsync(url);
                responseString = Encoding.UTF8.GetString(bytes);
            }
            
            var jsonResult = (JObject)JsonConvert.DeserializeObject(responseString);

            return GetLocationFromJson(jsonResult);
        }

        protected abstract Location GetLocationFromJson(JObject jObject);
    }
}
