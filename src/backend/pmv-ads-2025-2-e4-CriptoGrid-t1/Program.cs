using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Services;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var allowDev = "_allowDev";

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowDev, policy =>
                {
                    policy.WithOrigins(
                        "http://localhost:5173", // Vite
                        "http://localhost:19006", // Expo Web
                        "http://localhost:19000", // Expo DevTools
                        "http://localhost:8081"   // Expo bundler/web
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            // Mongo Settings
            builder.Services.Configure<CriptoGridDatabaseSettings>(
                builder.Configuration.GetSection("CriptoGridDatabase"));

            builder.Services.AddSingleton<IMongoClient>(s =>
                new MongoClient(builder.Configuration.GetValue<string>("CriptoGridDatabase:ConnectionString")));

            builder.Services.AddSingleton<IMongoDatabase>(s =>
            {
                var client = s.GetRequiredService<IMongoClient>();
                var dbName = builder.Configuration.GetValue<string>("CriptoGridDatabase:DatabaseName");
                return client.GetDatabase(dbName);
            });

            // Services
            builder.Services.AddSingleton<LoginService>();
            builder.Services.AddScoped<PublicDataService>();

            // Controllers
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Garante criação de índices iniciais
            using (var scope = app.Services.CreateScope())
            {
                var publicDataService = scope.ServiceProvider.GetRequiredService<PublicDataService>();
                publicDataService.EnsureIndexesExistAsync().Wait();
            }

            // Swagger habilitado SEMPRE (Dev + Produção)
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(allowDev);
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}

public partial class Program { }