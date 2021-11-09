using System.ComponentModel.DataAnnotations;

namespace Server.Models {
  public class RequestParams {
    // ============================= //
    [Range(-1, 1)]
    public int IsFavorite { get; set; } = -1;

    [Range(-1, int.MaxValue)]
    public int Id { get; set; } = -1;

    [Range(-1, int.MaxValue)]
    public int Page { get; set; } = -1;

    [Range(-1, 20)]
    public int Per_page { get; set; } = -1;

    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    // ============================= //
    public string First_name { get; set; }
    public string Full_name { get; set; }
    public string Last_name { get; set; }
    // ============================= //
  }
}