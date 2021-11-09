using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Models;

namespace Server.Services {
  public interface IProfileRepository {
    // ============================= //
    Task<PagedResult<Profile>> GetProfiles(RequestParams request);
    Task<Profile> GetProfile(int id);
    Task<Profile> UpdateProfile(Profile update);
    // ============================= //
  }
  public class ProfileRepository : IProfileRepository {
    // ============================= //
    private readonly DataContext context;
    private readonly IRemoteDataClient client;
    // ============================= //
    public ProfileRepository(IRemoteDataClient client, DataContext context) {
      this.client = client;
      this.context = context;
    }
    // ============================= //
    public async Task<Profile> GetProfile(int id) {
      try {
        await this.EnsureDefaults();
        return await this.context.Profiles.FirstAsync(x => x.Id == id);
      }
      catch (Exception) {
        return null;
      }
    }
    public async Task<PagedResult<Profile>> GetProfiles(RequestParams request) {
      try {
        await this.EnsureDefaults();
        request.Page = request.Page == -1 ? 1 : request.Page;
        request.Per_page = request.Per_page == -1 ? 5 : request.Per_page;

        var items = this.context.Profiles.Skip(request.Per_page * (request.Page - 1)).Take(request.Per_page);
        var total = await this.context.Profiles.CountAsync();
        var pages = total % request.Per_page > 0 ? total / request.Per_page + 1 : total / request.Per_page;
        return new PagedResult<Profile>(items, request.Page, request.Per_page, total, pages);
      }
      catch (Exception) {
        return null;
      }
    }
    public async Task<Profile> UpdateProfile(Profile update) {
      try {
        await this.EnsureDefaults();

        Profile result = this.context.Profiles.Update(update).Entity;
        await this.context.SaveChangesAsync();
        return result;
      }
      catch (Exception) {
        return null;
      }
    }
    // ============================= //
    private async Task EnsureDefaults() {
      if (!(await this.context.Profiles.AnyAsync())) {
        IEnumerable<Profile> values = (await this.client.GetRemoteData()).Data;

        await this.context.Profiles.AddRangeAsync(values);
        await this.context.SaveChangesAsync();
      }
    }
  }
}