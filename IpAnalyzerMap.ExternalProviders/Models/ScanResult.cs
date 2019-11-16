using System.Collections.Generic;

namespace IpAnalyzerMap.ExternalProviders.Models
{
    public class ScanResult
    {
        public string Isp { get; set; }
        public string Organization { get; set; }
        public string LastUpdateDate { get; set; }
        public List<string> Tags { get; set; }
        public List<int> Ports { get; set; }
        public List<string> Vulnerabilities { get; set; }

        public ScanResult()
        {
            Isp = "Не определен";
            Organization = "Не определена";
            LastUpdateDate = "Не определена";
            Tags = new List<string>();
            Ports = new List<int>();
            Vulnerabilities = new List<string>();
        }
    }
}