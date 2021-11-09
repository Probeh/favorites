using System.Collections.Generic;

namespace Server.Models {
  public class PagedResult<T> where T : Model {
    // ============================= //
    public IEnumerable<T> Data { get; set; }
    public int Page { get; set; }
    public int Per_page { get; set; }
    public int Total { get; set; }
    public int Total_pages { get; set; }
    // ============================= //
    public PagedResult(IEnumerable<T> data, int page, int per_page, int total, int total_pages) {
      this.Data = data;
      this.Page = page;
      this.Per_page = per_page;
      this.Total = total;
      this.Total_pages = total_pages;
    }

  }
}