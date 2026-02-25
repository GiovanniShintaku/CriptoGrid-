using Microsoft.Extensions.Options;
using MongoDB.Driver;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Services
{
    public class LoggedAreaDataService
    {
        private readonly IMongoCollection<UserCoinsData> _UserCoinsDataCollection;
        public LoggedAreaDataService(
            IOptions<CriptoGridDatabaseSettings> CriptoGridDatabaseSettings)
        {
            var MongoClient = new MongoClient(
             CriptoGridDatabaseSettings.Value.ConnectionString
             );

            var MongoDataBase = MongoClient.GetDatabase(
                CriptoGridDatabaseSettings.Value.DataBaseName
                );

            _UserCoinsDataCollection = MongoDataBase.GetCollection<UserCoinsData>(
                CriptoGridDatabaseSettings.Value.UserCoinsDataCollectionName);
        }

        public async Task<List<UserCoinsData>> GetAsync() =>
            await _UserCoinsDataCollection.Find(_=>true).ToListAsync();

        public async Task<UserCoinsData?> GetAsync(string id) =>
            await _UserCoinsDataCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(UserCoinsData newUserCoinsData) =>
           await _UserCoinsDataCollection.InsertOneAsync(newUserCoinsData);

        public async Task DeleteAsync(string id) =>
            await _UserCoinsDataCollection.DeleteOneAsync(x => x.Id == id);

        public async Task UpdateAsync(string id, UserCoinsData updatedUserCoinsData) =>
            await _UserCoinsDataCollection.ReplaceOneAsync(x => x.Id == id, updatedUserCoinsData);

    }
}
