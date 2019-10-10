using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Models;

namespace IpAnalyzerMap.ExternalProviders.Interfaces
{
    public interface ILocationProvider
    {
        string Name { get; }

        Task<Location> GetLocationByIp(string ipAddress);
    }
}
