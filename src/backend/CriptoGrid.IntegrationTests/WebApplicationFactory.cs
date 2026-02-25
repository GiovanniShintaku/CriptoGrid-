using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using pmv_ads_2025_2_e4_CriptoGrid_t1;

public class PublicDataControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public PublicDataControllerTests(WebApplicationFactory<Program> factory)
    {
        // Cria um cliente HTTP para a API em memória
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAllCoins_DeveRetornarStatusOk()
    {
        // Act
        var response = await _client.GetAsync("/api/PublicData");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetAllCoins_DeveRetornarListaDeMoedas()
    {
        // Act
        var response = await _client.GetAsync("/api/PublicData");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();

        // Verifica se retornou um array JSON válido
        json.Should().StartWith("[");
        json.Should().Contain("symbol").And.Contain("name");
    }
}