using System;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Server.Context;
using Server.Services;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Server {
	public class Startup {
		public IConfiguration Configuration { get; }
		public Startup(IConfiguration configuration) => this.Configuration = configuration;

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			Action<JsonOptions> json = (x) => {
				x.JsonSerializerOptions.AllowTrailingCommas = false;
				x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
				x.JsonSerializerOptions.WriteIndented = true;
			};
			Action<SwaggerGenOptions> swag = (x) =>
				x.SwaggerDoc("v1", new OpenApiInfo { Title = "Favorites", Version = "v1" });

			services
				.AddCors()
				.AddDbContext<DataContext>(x => x.UseSqlServer(this.Configuration.GetConnectionString("Profiles")))
				.AddScoped<IRemoteDataClient, RemoteDataClient>()
				.AddScoped<IProfileRepository, ProfileRepository>()
				.AddControllers()
				.AddJsonOptions(json).Services
				.AddSwaggerGen(swag);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			Action<CorsPolicyBuilder> cors = (x) => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
			Action<SwaggerUIOptions> swag = (x) => x.SwaggerEndpoint("/swagger/v1/swagger.json", "Server v1");

			if (env.IsDevelopment()) app
				.UseCors(cors)
				.UseDeveloperExceptionPage()
				.UseSwagger()
				.UseSwaggerUI(swag);

			// app.UseAuthorization();
			app.UseRouting();
			app.UseEndpoints(endpoints => endpoints.MapControllers());
		}
	}
}