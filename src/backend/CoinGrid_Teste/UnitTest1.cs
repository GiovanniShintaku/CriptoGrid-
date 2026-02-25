using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Moq;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Services;
using System.Reflection;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Tests
{
    public class PublicDataServiceTests
    {
        private readonly Mock<IMongoCollection<CoinData>> _mockCollection;
        private readonly Mock<IOptions<CriptoGridDatabaseSettings>> _mockOptions;
        private readonly PublicDataService _service;

        public PublicDataServiceTests()
        {
            _mockOptions = new Mock<IOptions<CriptoGridDatabaseSettings>>();
            _mockOptions.Setup(o => o.Value).Returns(new CriptoGridDatabaseSettings
            {
                ConnectionString = "mongodb://localhost:27017",
                DataBaseName = "CriptoGrid",
                CoinDataCollectionName = "CoinData"
            });

            _mockCollection = new Mock<IMongoCollection<CoinData>>();

            _service = (PublicDataService)Activator.CreateInstance(
                type: typeof(PublicDataService),
                bindingAttr: System.Reflection.BindingFlags.Instance |
                             System.Reflection.BindingFlags.Public |
                             System.Reflection.BindingFlags.NonPublic,
                binder: null,
                args: new object[] { _mockOptions.Object },
                culture: null
            )!;
        }

        [Fact(DisplayName = "CalculateStartDate deve retornar data correta para '7d'")]
        public void CalculateStartDate_DeveRetornarDataCorretaPara7d()
        {
            var metodo = typeof(PublicDataService)
                .GetMethod("CalculateStartDate", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)!;

            var resultado = (DateTime)metodo.Invoke(_service, new object[] { "7d" })!;
            var esperado = DateTime.UtcNow.AddDays(-7);

            Assert.True((resultado - esperado).TotalHours < 1,
                $"A data deve estar aproximadamente 7 dias atrás. Retornado: {resultado}, Esperado: {esperado}");
        }

        [Fact(DisplayName = "CalculateStartDate deve lançar exceção para timeframe inválido")]
        public void CalculateStartDate_DeveLancarErroParaTimeframeInvalido()
        {
            var metodo = typeof(PublicDataService)
                .GetMethod("CalculateStartDate", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)!;

            var ex = Assert.Throws<TargetInvocationException>(() =>
                metodo.Invoke(_service, new object[] { "99x" })
            );

            Assert.IsType<ArgumentException>(ex.InnerException);
            Assert.Contains("Timeframe inválido", ex.InnerException!.Message);
        }
    }
}
