using System.Collections.Generic;
using System.Threading.Tasks;

namespace IpAnalyzerMap.Web.Services
{
    public interface IListService
    {
        Task<List<(string Name, string Range)>> All();
        
        Task Add(string name, string range);
        
        Task Remove(string name);
    }
}