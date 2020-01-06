using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ExcelDataReader;
using IpAnalyzerMap.Web.Services.Interfaces;

namespace IpAnalyzerMap.Web.Services
{
    public class CvesProvider: ICvesProvider
    {
        private const string ResourceUrl = "https://bdu.fstec.ru/files/documents/vullist.xlsx";
        private const string ResourceName = "Resources/data.xlsx";
        private readonly List<(string Name, string Link)> _data;
        private readonly HttpClient _client;

        public CvesProvider(IHttpClientFactory factory)
        {
            _client = factory.CreateClient();
            _data = new List<(string Name, string Link)>();
        }

        public async Task LoadData()
        {
            try
            {
                await using var webStream = await _client.GetStreamAsync(ResourceUrl );
                await using var fileStream = new FileStream(ResourceName, FileMode.Create, FileAccess.Write);
                webStream.CopyTo(fileStream);
            }
            catch
            {
                //ignore
            }
            
            await using var stream = File.Open(ResourceName , FileMode.Open, FileAccess.Read);
            using var reader = ExcelReaderFactory.CreateReader(stream);
            
            // Skip first 3 rows with headers
            reader.Read();
            reader.Read();
            reader.Read();
            
            while (reader.Read())
            {
                var link = reader.GetString(0);
                var name = reader.GetString(18);
                if (name != null && link != null)
                {
                    _data.Add((reader.GetString(18), reader.GetString(0)));
                }
            }
        }
        
        public string GetLink(string cveName)
        {
            try
            {
                var result = _data.FirstOrDefault(c => c.Name.Contains(cveName)).Link;
                return result?.Remove(0, 4);
            }
            catch (Exception e)
            {
                var t = e;
            }

            return null;
        }
    }
}