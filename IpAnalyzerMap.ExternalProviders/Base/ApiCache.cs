using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;

namespace IpAnalyzerMap.ExternalProviders.Base
{
    internal static class ApiCache
    {
        private static volatile string _lastDateKey = GetDateKey();
            
        private static readonly ConcurrentDictionary<string, string> CachedValues = new ConcurrentDictionary<string, string>();

        public static void AddValue(string url, string value)
        {
            CachedValues.TryAdd(url, value);
        }
        
        public static bool TryGetValue(string url, out string result)
        {
            ClearCacheHourly();
            return CachedValues.TryGetValue(url, out result);
        }

        private static void ClearCacheHourly()
        {
            var newKey = GetDateKey();
            var previousKey = Interlocked.CompareExchange(ref _lastDateKey, newKey, GetDateKeyHourBefore());
            if (previousKey.Equals(newKey)) return;

            foreach (var key in CachedValues.Keys)
            {
                CachedValues.TryRemove(key, out _);
            }
        }

        private static string GetDateKey() => string.Intern($"{DateTime.Now:MM/dd/HH}");

        private static string GetDateKeyHourBefore() => string.Intern($"{DateTime.Now.AddHours(-1):MM/dd/HH}");
    }
}