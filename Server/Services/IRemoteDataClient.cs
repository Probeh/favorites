using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Server.Models;

namespace Server.Services {
  public interface IRemoteDataClient {
    // ============================= //
    Task<PagedResult<Profile>> GetRemoteData();
    // ============================= //
  }
  public class RemoteDataClient : IRemoteDataClient {
    // ============================= //
    public RemoteDataClient() { }
    // ============================= //
    public async Task<PagedResult<Profile>> GetRemoteData() {
      try {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Accept", "application/json");
        client.DefaultRequestHeaders.Add("User-Agent", "HttpClient");
        var request = new HttpRequestMessage(HttpMethod.Get, "https://reqres.in/api/users?per_page=20");

        using var stream = (await client.SendAsync(request)).Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<PagedResult<Profile>>(stream.Result);
      }
      catch (Exception) {
        return null;
      }
    }
  }
}