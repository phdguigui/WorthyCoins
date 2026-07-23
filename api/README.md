Create Migration

PS C:\git\WorthyCoins\api> dotnet ef migrations add AddTablesUserTaskAndChild -p WorthyCoins.Infrastructure --startup-project WorthyCoins.API

Update Database

PS C:\git\WorthyCoins\api> dotnet ef database update -p WorthyCoins.Infrastructure --startup-project WorthyCoins.API
