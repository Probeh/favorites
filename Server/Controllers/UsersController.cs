using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers {
	[ApiController, Route("api/[controller]")]
	public class UsersController : ControllerBase {
		// ============================= //
		private readonly IProfileRepository repo;
		// ============================= //
		public UsersController(IProfileRepository repo) => this.repo = repo;
		// ============================= //
		[HttpGet]
		public async Task<IActionResult> GetProfiles([FromQuery] RequestParams request) {
			if (!ModelState.IsValid)
				return BadRequest(ModelState.Values);

			try {
				var result = await this.repo.GetProfiles(request);
				return Ok(result);
			}
			catch (Exception error) {
				return BadRequest(error.Message);
			}
		}

		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetProfile([FromRoute, Required] int id) {
			if (!ModelState.IsValid)
				return BadRequest(ModelState.Values);

			try {
				var result = await this.repo.GetProfile(id);
				return Ok(result);
			}
			catch (Exception error) {
				return BadRequest(error.Message);
			}
		}

		[HttpPut]
		public async Task<IActionResult> UpdateProfile([FromBody] Profile update) {
			if (!ModelState.IsValid)
				return BadRequest(ModelState.Values);

			try {
				var result = await this.repo.UpdateProfile(update);
				return Ok(result);
			}
			catch (Exception error) {
				return BadRequest(error.Message);
			}
		}
	}
}