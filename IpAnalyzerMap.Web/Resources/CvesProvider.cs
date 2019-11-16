using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using IpAnalyzerMap.Web.Resources.Interfaces;

namespace IpAnalyzerMap.Web.Resources
{
    public class CvesProvider: ICvesProvider
    {
        private const string ResourceName = "IpAnalyzerMap.Web.Resources.data.txt";
        private readonly List<(string Name, string Link)> _data;

        public CvesProvider()
        {
            _data = new List<(string Name, string Link)>();
            
            var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(ResourceName);
            if(stream == null) return;
            
            using (stream)
            {
                using var reader = new StreamReader(stream, Encoding.UTF8);
                var line = reader.ReadLine();
                while (line != null)
                {
                    var parts = line.Split(';');
                    _data.Add((parts[1], parts[0]));
                    
                    line = reader.ReadLine();
                }
            }
        }
        
        public string GetLink(string cveName)
        {
            var result = _data.FirstOrDefault(c => c.Name.Contains(cveName)).Link;
            return result?.Remove(0, 4);
        }
    }
}