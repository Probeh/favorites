namespace Server.Models {
  public class Profile : Model {
    // ============================= //
    public bool IsFavorite { get; set; }
    public string Email { get; set; }
    public string First_name { get; set; }
    public string Full_name { get => $"{this.First_name} {this.Last_name}"; }
    public string Last_name { get; set; }
    // ============================= //
  }
}