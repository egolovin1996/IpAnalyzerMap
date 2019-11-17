using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VirusTotalNet;
using VirusTotalNet.Results;

namespace IpAnalyzerMap.Web.Controllers
{
    public class ScanController: Controller
    {
        private const string ApiKey = "44d141cf3917c0a2f2fcdc834e15f90c1e2c4472dbda5186fb3f6ed01623bcae";
        private VirusTotal _virusTotal;
        
        public ScanController()
        {
            _virusTotal = new VirusTotal(ApiKey);
        }
        
        [HttpGet("api/scan/getFileReport")]
        public async Task<FileReport> GetFileReport()
        {
            byte[] eicar = Encoding.ASCII.GetBytes(@"X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*");
            return await _virusTotal.GetFileReportAsync(eicar);
        }
        
        [HttpGet("api/scan/getUrlReport/{url}")]
        public async Task<UrlReport> GetUrlReport(string url)
        {
            return await _virusTotal.GetUrlReportAsync(url);
        }
    }
}