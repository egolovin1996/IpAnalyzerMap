using System;
using System.Threading.Tasks;
using IpAnalyzerMap.ExternalProviders.Base;
using IpAnalyzerMap.ExternalProviders.Models;
using IPGeolocation;

namespace IpAnalyzerMap.ExternalProviders
{
    public class IpGeoLocationIoLocationProvider : BaseLocationProvider
    {
        private const string ApiKey = "13af2a8b60384f45822c6a07eae62d01";
        
        protected override string Name => "ipgeolocation.io";
        
        protected override Task<Location> GetLocationByIpInner(string ipAddress)
        {
            var api = new IPGeolocationAPI(ApiKey);
            var geoParams = new GeolocationParams();
            geoParams.SetIp(ipAddress);
            
            var geolocation = api.GetGeolocation(geoParams);
            if (geolocation.GetStatus() != 200) throw new Exception();

            return Task.FromResult(new Location()
            {
                City = geolocation.GetCity(),
                Country = geolocation.GetCountryName(),
                Latitude = double.Parse(geolocation.GetLatitude(), System.Globalization.CultureInfo.InvariantCulture),
                Longitude = double.Parse(geolocation.GetLongitude(), System.Globalization.CultureInfo.InvariantCulture)
            });
        }
    }
}