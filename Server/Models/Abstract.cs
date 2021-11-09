using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models {
	public class Model {
		// ============================= //
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int Id { get; set; }
		public string Avatar { get; set; }
		// ============================= //
	}
}