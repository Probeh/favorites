dotnet ef migrations add InitialCreate --prefix-output --json && start snapshot && dotnet ef database update --verbose