using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class MyIpLocationProvider : BaseLocationProvider
    {
        private const string AppId = "id62925";
        private const string ApiKey = "965515633-1723940776-1014634067";
        private const string BaseUrl = "https://api.myip.ms";

        protected override string Name => "myip.ms";

        private readonly HttpClient _httpClient;

        public MyIpLocationProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        protected override async Task<Location> GetLocationByIpInner(string ipAddress)
        {
            var url = GetUrl(ipAddress);

            var responseString = await _httpClient.GetStringAsync(url);
            var jsonResult = (JObject)JsonConvert.DeserializeObject(responseString);

            return GetLocationFromJson(jsonResult);
        }

        private static string GetUrl(string ipAddress)
        {
            var apiPart = $"{BaseUrl}/{ipAddress}/api_id/{AppId}/api_key/{ApiKey}/";
            var timePart = $"timestamp/{DateTime.UtcNow:yyyy-MM-dd_HH:mm:ss}";
            var signature = GetMd5Hash($"{apiPart}{timePart}");

            return $"{apiPart}signature/{signature}/{timePart}";
        }

        private static string GetMd5Hash(string s)
        {
            using var provider = MD5.Create();
            var builder = new StringBuilder();
            foreach (var b in provider.ComputeHash(Encoding.UTF8.GetBytes(s)))
            {
                builder.Append(b.ToString("x2").ToLower());
            }

            return builder.ToString();
        }

        private static Location GetLocationFromJson(JObject jsonResult)
        { 
            return new Location()
            {
                Country = jsonResult["owners"]["owner"]["address"].Value<string>()
            };
        }
    }
}
