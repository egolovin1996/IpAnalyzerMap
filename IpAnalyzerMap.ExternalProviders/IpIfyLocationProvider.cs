﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using Newtonsoft.Json.Linq;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpIfyLocationProvider : BaseApiLocationProvider
    {
        public override string Name => "https://geo.ipify.org";

        protected override string BaseUrl =>
            "https://geo.ipify.org/api/v1?apiKey=at_FHHpp2jdd5SdN3rC5Y78X1BCXrrPr&ipAddress=";

        protected override string EndPart => "";

        public IpIfyLocationProvider(HttpClient httpClient) : base(httpClient) { }

        protected override Location GetLocationFromJson(JObject jObject)
        {
            var jLocation = jObject["location"];
            return new Location()
            {
                Name = jLocation["city"].Value<string>() + "(" + jLocation["country"].Value<string>() + ")",
                Latitude = jLocation["lat"].Value<double>(),
                Longitude = jLocation["lng"].Value<double>()
            };
        }
    }
}
