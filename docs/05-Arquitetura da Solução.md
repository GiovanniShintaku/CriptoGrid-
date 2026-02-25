# Arquitetura da Solução

## Visão Geral
Optamos pela **Arquitetura de Microserviços** utilizando **API REST**.  
Essa modelagem traz os seguintes benefícios:  
- Escalabilidade independente dos serviços  
- Modularidade  
- Manutenção simplificada  
- Resiliência a falhas em serviços isolados  

![Diagrama da Arquitetura Distribuída Microserviços](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1/blob/main/docs/img/diagrama_arquitetura.png)


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Documentação do Banco de Dados MongoDB

Este documento descreve a estrutura e o esquema do banco de dados não relacional utilizado por nosso projeto, baseado em MongoDB. O MongoDB é um banco de dados NoSQL que armazena dados em documentos JSON (ou BSON, internamente), permitindo uma estrutura flexível e escalável para armazenar e consultar dados.

## Esquema do Banco de Dados
### Coleção: UserAuthData
Schema para um documento na coleção de autenticação de usuários, contém apenas dados de perfil e login.

Estrutura do Documento

```Json
{
    "_id": "ObjectId('68d5ba0550c6580418dec798')",
    "Id": 1, 
    "Email": "emailteste@gmail.com",
    "Password": "12345678Aa",
    "Name": "bot1",
    "createdAt": "2025-09-25T10:00:00Z",
}
```

#### Descrição dos Campos
> - <strong>_id:</strong> Identificador único do usuário gerado automaticamente pelo MongoDB.
> - <strong>Id:</strong> Identificador único do usuário.
> - <strong>email:</strong> Endereço de email do usuário.
> - <strong>Password:</strong> Senha do usuário.
> - <strong>name:</strong> Nome completo do usuário.
> - <strong>createdAt:</strong> Data e hora de criação do usuário.

### Coleção: CoinData
Schema para um documento na coleção de criptomoedas.

```Json
{
    "_id": "ObjectId('68d5c11550c6580418dec79a')",
    "Id": "1",
    "Symbol": "btc",
    "Name": "Bitcoin",
    "Image": "https://pt.wikipedia.org/wiki/Bitcoin#/media/Ficheiro:Bitcoin.svg",
    "Description": "Moeda virtual para loucos",
    "CategoriesID": 1,
    "AssetplatformId": "Exemplo",
    "MArketData": [{
         "CurrentPrice": 900,
         "MarketCap": 1000,
         "MarketCapRank": 1,
         "High24h": 990,
         "Low24h": 890,
         "PriceChangePercentage24h": 10,
         "PriceChangePercentage7dInCurrency": 5,
         "TotalVolume": 5000,
         "Lastupdated": "2025-09-26T17:00:00Z"

   }]
   
}
```

#### Descrição dos Campos
> - <strong>_id:</strong> Identificador único do objeto gerado automaticamente pelo MongoDB.
> - <strong>Id:</strong> Identificador único da moeda.
> - <strong>Symbol:</strong> Código reconhecido internacionalmente de cada moeda.
> - <strong>Name:</strong> Nome de cada moeda
> - <strong>Image:</strong> URL contendo o endereço da logo da moeda.
> - <strong>Description:</strong> Descrição da moeda.
> - <strong>CategoriesId:</strong> Identificador de categoria da qual a moeda pertence.
> - <strong>AssetPlatformId:</strong> .
> - <strong>MarketData:</strong> Objeto que contém a maior parte das informações sobre a moeda.

### Coleção: UserCoinData
Schema para a coleção de ligação, cada documento conect um usuário (via UserId) e uma moeda (via CoinId).

Estrutura do Documento

```Json
{
    "_id": "ObjectId('5f7e1ccf9b2a4f1a9c38b9a2')",
    "Id": "1",
    "UserId": "1",
    "CoinId": "1",
    "AddedAt": 2025-08-20T15:00:00.000+00:00,
}
```

#### Descrição dos Campos
> - <strong>_id:</strong> Identificador único do produto gerado automaticamente pelo MongoDB.
> - <strong>Id:</strong> Identificador do documento.
> - <strong>UserId:</strong> Identificador do usuário.
> - <strong>coinId:</strong> Identificador da moeda.
> - <strong>AddedAt:</strong> Data e hora de criação do documento.


### Boas Práticas

Validação de Dados: Implementar validação de esquema e restrições na aplicação para garantir a consistência dos dados.

Monitoramento e Logs: Utilize ferramentas de monitoramento e logging para acompanhar a saúde do banco de dados e diagnosticar problemas.

Escalabilidade: Considere estratégias de sharding e replicação para lidar com crescimento do banco de dados e alta disponibilidade.

### Material de Apoio da Etapa

Na etapa 2, em máterial de apoio, estão disponíveis vídeos com a configuração do mongo.db e a utilização com Bson no C#


## Modelo ER (Somente se tiver mais de um banco e outro for relacional)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional (Somente se tiver mais de um banco e outro for relacional)

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico (Somente se tiver mais de um banco e outro for relacional)

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Para implementação da solução, uma arquitetura de microsserviços foi adotada, utilizando ferramentas já conhecidas no mercado. As tecnologias cobrem desde o desenvolvimento das interfaces de usuário (front-end) e a lógica de negócio (back-end/APIS) até o gerenciamento dos dados.

### Linguagens e frameworks de desenvolvimento

<img width="727" height="332" alt="image" src="https://github.com/user-attachments/assets/24500626-e20d-484c-b471-3585e11de49e" />

### Banco de dados

<img width="840" height="114" alt="image" src="https://github.com/user-attachments/assets/a4d631db-bc07-470b-9aee-eb24a583c4a5" />

### Ferramentas e outras tecnologias

<img width="836" height="116" alt="image" src="https://github.com/user-attachments/assets/314c1f46-2588-4f36-9220-1c90c313df79" />

## Relação entre as Tecnologias e Fluxo de Interação

A figura localizada no início da parte 5 da documentação, no campo "Visão Geral", ilustra a arquitetura geral do sistema e o fluxo de interação, demonstrando como as tecnologias estão interligadas para servir ao usuário.

### Explicação do Fluxo de Interação
O sistema é construído em torno de uma API central que atua como o ponto de entrada para todas as interações do usuário, sejam elas originadas de um dispositivo Mobile ou do Frontend Web (ambos desenvolvidos com React e Chart.js).

1. Interação do Usuário: O usuário inicia a interação a partir do aplicativo Mobile ou da página Web.

2. Chamada à API (REST API Calls): A aplicação front-end envia requisições formatadas no padrão REST para o ponto central da API.

3. Encaminhamento para Microsserviços (C#): A API direciona a requisição para o microsserviço C# apropriado:

    a. Serviço de Login: Para autenticar o usuário, interagindo com a coleção user_auth_data (MongoDB).

    b. Serviço de Dados da Área Logada: Para funcionalidades exclusivas de usuários autenticados (Ex: dados de portfólio), interagindo com a coleção users_coins_data (MongoDB).

    c. Serviço de Dados Públicos: Para informações que não requerem login, como dados gerais de moedas, consultando as coleções coin_data e users_coins_data (MongoDB).

4. Ingestão de Dados (Fluxo Back-end): Separadamente, o Serviço de Ingestão de Dados (C#) é responsável por consumir de forma contínua ou agendada uma API Pública Externa. Ele processa esses dados e os armazena na coleção coin_data (MongoDB), garantindo que os dados servidos aos usuários estejam sempre atualizados.

5. Retorno: O microsserviço C# processa a lógica de negócio, interage com o MongoDB conforme necessário, e devolve a resposta através da API de volta para a aplicação front-end (Mobile ou Web), que utiliza o React para atualizar a interface e o Chart.js para exibir gráficos.



## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
