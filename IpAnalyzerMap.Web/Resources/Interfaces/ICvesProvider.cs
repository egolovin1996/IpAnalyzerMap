using System.Threading.Tasks;

namespace IpAnalyzerMap.Web.Resources.Interfaces
{
    public interface ICvesProvider
    {
        string GetLink(string cveName);
        Task LoadData();
    }
}