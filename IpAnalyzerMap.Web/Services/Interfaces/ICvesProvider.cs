using System.Threading.Tasks;

namespace IpAnalyzerMap.Web.Services.Interfaces
{
    public interface ICvesProvider
    {
        string GetLink(string cveName);
        Task LoadData();
    }
}