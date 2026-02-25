using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using DataIngest_CoinGecko.Models;

var builder = Host.CreateApplicationBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddUserSecrets<Worker>(optional: true)
    .AddEnvironmentVariables();

builder.Services.AddHttpClient("CoinGecko", (sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var apiKey = config.GetValue<string>("CoinGecko:ApiKey");

    if (!string.IsNullOrEmpty(apiKey))
        client.DefaultRequestHeaders.Add("x-cg-demo-api-key", apiKey);
});


builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var connectionString = config.GetValue<string>("CriptoGridDatabase:ConnectionString");

    if (string.IsNullOrEmpty(connectionString))
        throw new InvalidOperationException("ConnectionString do MongoDB não encontrada em CriptoGridDatabase.");

    return new MongoClient(connectionString);
});

builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var config = sp.GetRequiredService<IConfiguration>();
    var dbName = config.GetValue<string>("CriptoGridDatabase:DataBaseName") ?? "CriptoGrid";

    return client.GetDatabase(dbName);
});

builder.Services.AddSingleton(sp =>
{
    var db = sp.GetRequiredService<IMongoDatabase>();
    var config = sp.GetRequiredService<IConfiguration>();
    var collectionName = config.GetValue<string>("CriptoGridDatabase:CoinDataCollectionName") ?? "CoinData";

    return db.GetCollection<CoinData>(collectionName);
});

builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();