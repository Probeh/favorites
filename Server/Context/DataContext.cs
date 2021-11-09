using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Context {
  public class DataContext : DbContext {
    // ============================= //
    public DbSet<Profile> Profiles { get; set; }
    // ============================= //
    public DataContext(DbContextOptions options) : base(options) { }
    protected DataContext() { }
    // ============================= //
  }
}