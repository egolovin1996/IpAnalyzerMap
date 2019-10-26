using System;
using System.Collections.Generic;
using System.Text;

namespace IpAnalyzerMap.ExternalProviders.Models
{
    public class Location
    {
        public string Provider { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
