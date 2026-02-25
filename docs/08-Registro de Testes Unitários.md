## 🧪 Relatório de Testes Unitários – Backend CriptoGrid

### Ambiente de Testes
- **Framework:** .NET 8.0  
- **Biblioteca de testes:** xUnit  
- **Ferramentas auxiliares:** Moq, MongoDB.Driver, Microsoft.Extensions.Options  
- **Projeto de Testes:** `CoinGrid_Teste`  
- **Projeto Principal:** `pmv-ads-2025-2-e4-CriptoGrid-t1`

---

### Escopo dos Testes
Os testes unitários foram aplicados sobre a classe `PublicDataService`, responsável pela manipulação e consulta de dados públicos das criptomoedas no banco MongoDB.

Foram criados dois casos principais, validando o comportamento interno do método `CalculateStartDate`, utilizado para cálculo de janelas de tempo nos históricos de preço e volume.

---

### Casos de Teste

#### 🧩 Teste 1 — `CalculateStartDate_DeveRetornarDataCorretaPara7d`
- **Objetivo:** Validar se o cálculo da data inicial para o timeframe de sete dias (`7d`) retorna o valor correto.  
- **Critério de Sucesso:** O valor retornado deve ser aproximadamente 7 dias antes da data atual (tolerância < 1 hora).  
- **Resultado:** ✅ Sucesso — Data retornada dentro do intervalo esperado.  

#### ⚠️ Teste 2 — `CalculateStartDate_DeveLancarErroParaTimeframeInvalido`
- **Objetivo:** Verificar se um timeframe inválido dispara a exceção `ArgumentException`.  
- **Critério de Sucesso:** O método deve lançar exceção com a mensagem *"Timeframe inválido"*.  
- **Resultado:** ✅ Sucesso — Exceção lançada conforme esperado.  

---

### Resultados da Execução

PS C:\Users\camil\Downloads\Repositorios\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\CoinGrid_Teste> dotnet test
Restauração concluída (0,3s)
  pmv-ads-2025-2-e4-CriptoGrid-t1 êxito(s) com 3 aviso(s) (1,1s) → C:\Users\camil\Downloads\Repositorios\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\bin\Debug\net8.0\pmv-ads-2025-2-e4-CriptoGrid-t1.dll
    C:\Users\camil\Downloads\Repositorios\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(12,23): warning CS8618: O propriedade não anulável 'Email' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
    C:\Users\camil\Downloads\Repositorios\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(13,23): warning CS8618: O propriedade não anulável 'Password' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
    C:\Users\camil\Downloads\Repositorios\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(14,23): warning CS8618: O propriedade não anulável 'Name' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
  CoinGrid_Teste êxito (0,4s) → bin\Debug\net8.0\CoinGrid_Teste.dll
[xUnit.net 00:00:00.00] xUnit.net VSTest Adapter v3.1.5+1b188a7b0a (64-bit .NET 8.0.13)
[xUnit.net 00:00:00.07]   Discovering: CoinGrid_Teste
[xUnit.net 00:00:00.10]   Discovered:  CoinGrid_Teste
[xUnit.net 00:00:00.11]   Starting:    CoinGrid_Teste
[xUnit.net 00:00:00.39]   Finished:    CoinGrid_Teste
  CoinGrid_Teste teste êxito (1,0s)

Resumo do teste: total: 2; falhou: 0; bem-sucedido: 2; ignorado: 0; duração: 1,0s
Construir êxito(s) com 3 aviso(s) em 3,4s

---
### Escopo dos Testes
Os testes unitários foram aplicados sobre a classe `PublicDataService`, `PublicDataController` e `CoinData`, responsável pela manipulação e consulta de dados públicos das criptomoedas no banco MongoDB.

Foram criados dois casos principais, validando as propriedades do Model e suas conversões nas requisições, comportamento interno do método `GetAll` com parâmetros certos e parâmetros faltosos não acidentais a fins de controle em caso de falha, utilizado para acessar todos os dados usados.

---

### Casos de Teste

#### 📋 Teste 3 — `ModelDeveRetornarCorpoEmJsonJaconvertido`
- **Objetivo:** Validar se ao chamar qualquer Objeto pela API ele vem no mesmo formato que todos e com suas informações de tempo já convertidas Unix Timestamp em DateTime (tolerância 3 horas de diferença por fuso horário). 
- **Critério de Sucesso:** A requisição retornou com código 200(OK) e o corpo do objeto em JSON e os atributos `LastUpdated`, `Ingestion_date` e `Ohlc` já convertidos em DateTime.  
- **Resultado:** Sucesso — Objeto retornado sem complicações e com datas já convertidas.  

#### 🛑 Teste 4 — `GetAll_ComportamentoComRequisição`
- **Objetivo:** Verificar se uma requisição inválida ou dispara a exceção `ArgumentException` e dá Log do erro.  
- **Critério de Sucesso:** O método deve lançar exceção com a mensagem *"Nenhum dado encontrado."* e um log no console com o código http "404".  
- **Resultado:** ✅ Sucesso — Exceção lançada conforme esperado.  

---

### Resultados da Execução

PS C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\CoinGrid_Teste> dotnet test
Restauração concluída (0,3s)
  pmv-ads-2025-2-e4-CriptoGrid-t1 êxito(s) com 3 aviso(s) (1,1s) → C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\bin\Debug\net8.0\pmv-ads-2025-2-e4-CriptoGrid-t1.dll
    C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(12,23): warning CS8618: O propriedade não anulável 'Email' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
    C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(13,23): warning CS8618: O propriedade não anulável 'Password' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
    C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(14,23): warning CS8618: O propriedade não anulável 'Name' precisa conter um valor não nulo ao sair do construtor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
  CoinGrid_Teste êxito (0,4s) → bin\Debug\net8.0\CoinGrid_Teste.dll
[xUnit.net 00:00:00.00] xUnit.net VSTest Adapter v3.1.5+1b188a7b0a (64-bit .NET 8.0.13)
[xUnit.net 00:00:00.032]   Discovering: CoinGrid_Teste
[xUnit.net 00:00:00.43]   Discovered:  CoinGrid_Teste
[xUnit.net 00:00:00.47]   Starting:    CoinGrid_Teste
[xUnit.net 00:00:00.58]   Finished:    CoinGrid_Teste
  CoinGrid_Teste teste êxito (1,0s)

Resumo do teste: total: 2; falhou: 0; bem-sucedido: 2; ignorado: 0; duração: 1,0s
Construir êxito(s) com 3 aviso(s) em 3,4s

Request URL
http://localhost:5044/api/PublicData

Code 200 OK
[
  {
    "mongoId": "string",
    "id": "string",
    "symbol": "string",
    "name": "string",
    "image": "string",
    "current_price": 0,
    "market_cap": 0,
    "market_cap_rank": 0,
    "total_volume": 0,
    "price_change_percentage_24h": 0,
    "last_updated": "2025-10-26T21:59:20.696Z",
    "ingestionDate": "2025-10-26T21:59:20.696Z",
    "ohlc": [
      {
        "timestamp": "2025-10-26T21:59:20.696Z",
        "open": 0,
        "high": 0,
        "low": 0,
        "close": 0
      }
    ]
  }
]

As atualizações de carga de trabalho estão disponíveis. Execute `dotnet workload list` para obter mais informações.

Os testes unitários executados no backend do projeto **CriptoGrid** validaram com sucesso o comportamento interno do serviço `PublicDataService`, `PublicDataController` e `CoinData`.  
Ambos os cenários passaram sem falhas, confirmando a estabilidade e uniformidade das funções de obtenção das informações provindas do banco.
