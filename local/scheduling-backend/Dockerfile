# 1️⃣ Build stage: use the .NET SDK to restore and publish
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

WORKDIR /app/Net
RUN dotnet restore

# Expose the port your app listens on
EXPOSE 5041

# Set environment variable so .NET listens on all interfaces
ENV ASPNETCORE_URLS=http://+:5041

# Start the app
ENTRYPOINT ["dotnet", "run", "--urls", "http://+:5041"]
