using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Items = System.Collections.Generic.List<(string Name, string Range)>;

namespace IpAnalyzerMap.Web.Services
{
    public class ListService : IListService
    {
        private const string ListName = "Resources/list.json";
        
        public async Task<Items> All()
        {
            var result = await ReadFromFileAsync();
            
            return result;
        }

        public async Task Add(string name, string range)
        {
            var allExisting = await ReadFromFileAsync();
            allExisting.Add((name, range));
            await WriteToFileAsync(allExisting);
        }

        public async Task Remove(string name, string range)
        {
            var allExisting = await ReadFromFileAsync();
            var itemToRemove = allExisting.FirstOrDefault(i 
                => i.Name.Equals(name) && i.Range.Equals(range));
            if (!string.IsNullOrEmpty(itemToRemove.Name))
            {
                allExisting.Remove(itemToRemove);
                await WriteToFileAsync(allExisting);
            }
        }

        private async Task<Items> ReadFromFileAsync()
        {
            CreateFileIfNotExist();
            
            var allText = await File.ReadAllTextAsync(ListName, Encoding.UTF8);
            var result = JsonConvert.DeserializeObject<Items>(allText);
            if (result == null)
            {
                result = new Items();
            }

            return result;
        }

        private async Task WriteToFileAsync(Items items)
        {
            CreateFileIfNotExist();

            var text = JsonConvert.SerializeObject(items);
            await File.WriteAllTextAsync(ListName, text, Encoding.UTF8);
        }

        private void CreateFileIfNotExist()
        {
            if (!File.Exists(ListName))
            {
                File.Create(ListName);
            }
        }
    }
}