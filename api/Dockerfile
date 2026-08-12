# Use the official ASP.NET Core runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files and restore dependencies to optimize caching
COPY ["WorthyCoins.API/WorthyCoins.API.csproj", "WorthyCoins.API/"]
COPY ["WorthyCoins.Application/WorthyCoins.Application.csproj", "WorthyCoins.Application/"]
COPY ["WorthyCoins.Domain/WorthyCoins.Domain.csproj", "WorthyCoins.Domain/"]
COPY ["WorthyCoins.Infrastructure/WorthyCoins.Infrastructure.csproj", "WorthyCoins.Infrastructure/"]

RUN dotnet restore "WorthyCoins.API/WorthyCoins.API.csproj"

# Copy the rest of the backend files
COPY . .

# Build the application
WORKDIR "/src/WorthyCoins.API"
RUN dotnet build "WorthyCoins.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish the application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "WorthyCoins.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorthyCoins.API.dll"]
