using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Models;

namespace IpAnalyzerMap.ExternalProviders.Base
{
    public abstract class BaseLocationProvider
    {
        protected abstract string Name { get; }

        public async Task<Location> GetLocationByIp(string ipAddress)
        { 
            var result = await GetLocationByIpInner(ipAddress);
            result.Provider = Name;

            return result;
        }
        
        protected abstract Task<Location> GetLocationByIpInner(string ipAddress);
    }
}
