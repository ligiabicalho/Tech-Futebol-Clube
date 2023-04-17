# :sparkles: Projeto Tech Futebol Clube :soccer:  
O `TFC` é um site informativo sobre partidas e classificações de futebol!

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
  - [Contexto](#man_technologist-contexto)
  - [Demo](#demo)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Banco de dados](#banco-de-dados)
- [Uso](#documentação-da-api)
  - [Documentação da API](#documentação-da-api)
    - [Visão Geral](#visão-geral)
    - [Exemplos](#Corpo-das-requisições-e-respostas)
  - [Banco de Dados](#banco-de-dados-1)
    - [Diagrama ER](#diagrama-er)
    - [Seeders](#seeders)
    - [Exemplo de um arquivo `.env`](#exemplo-de-um-arquivo-env)
- [Instalação](#instalando-localmente)
  - [Docker](#docker)
  - [Rodando testes](#rodando-os-testes)
- [Desenvolvedora](#desenvolvedora)
- [Agradecimentos](#agradecimentos)


<br/>

# Sobre o projeto

## :man_technologist: Contexto  

O desafio deste projeto foi desenvolver uma API (utilizando o método TDD) e integrar, através do docker-compose, as aplicações para que elas funcionem consumindo um banco de dados relacional.

Minha responsabilidade foi construir o back-end dockerizado (dockerfile do back e front) utilizando modelagem de dados através do Sequelize. 
O desenvolvimento teve que respeitar as regras de negócio para que a API seja consumida adequadamente pelo front-end disponibilizado, que exibe as informações tabeladas para a pessoa usuária do sistema.

Para algumas rotas, como adicionar uma partida, é necessário ter um `token`, portanto a pessoa deverá estar logada para fazer as alterações.
Há um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

## Demo  

  *Em breve*

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>

# Tecnologias utilizadas

- Docker 

## Front-end  
> *Fornecido pronto pela instituição* 
- React js  

## Back-end  
- JavaScript / TypeScript
- Node.js
- Express.js
- Sequelize
- JSON Web Token (JWT)
- Bcrypt.js 
  ### Testes
    - Mocha
    - Chai
    - Sinon

## Banco de dados  
  - MySQL 

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>

## Documentação da API

### **Visão geral**

| Endpoint     | Método HTTP | Descrição               | 
| :----------- | :---------- | :---------------------- |
| [`/login`](#endpoint-login)   | POST        | Faz o login com usuários do banco de dados 
| [`/login/role`](#endpoint-loginrole)| GET         | :closed_lock_with_key: Retorna o *role* do usuário logado (user ou adm)  |
| [`/teams`](#endpoint-teams)     | GET         | Retorna todos os times do campeonato
| [`/teams/:id`](#parâmetro-id-teamsid) | GET         | Retorna o time especificado no id
| [`/matches`](#endpoint-matches)   | GET         | Retorna todas as partidas 
| [`/matches`](#endpoint-matches)           | POST         | :closed_lock_with_key: Insere uma nova partida em andamento.
| [`/matches?inProgress=true`](#parâmetro-inprogress-matchesinprogress) | GET         | Retorna as partidas em andamento.
| [`/matches?inProgress=false`](#parâmetro-inprogress-matchesinprogress)| GET         | Retorna as partidas finalizadas.
| [`/matches/:id`](#parâmetro-id-matchesid)    | PATCH       | :closed_lock_with_key: Atualiza a partida de acordo com seu id.
| [`/matches/:id/finish`](#endpoint-matchesidfinish) | PATCH       | :closed_lock_with_key: Finaliza uma partida em andamento.
| [`/leaderboard`](#endpoint-leaderboard)       | GET          | Retorna a classificação geral do campeonato.
| [`/leaderboar/home`](#endpoint-leaderboardhome)   | GET          | Retorna a classificação dos times mandantes.
| [`/leaderboard/away`](#endpoint-leaderboardaway)  | GET          | Retorna a classificação dos times visitantes.

:closed_lock_with_key: : Necessário que o `token` gerado no login seja enviado no headers como _"Authorization"_.

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>

### **Corpo das requisições e respostas**  
> *Clique nas setas para ver mais*  

#### **Endpoint:** `/login`  

- <details><summary>Método POST </summary>  
  Exemplo de corpo da requisção válido  

    ```json
    {
      "email": "user@user.com",
      "password": "secret_user", 
    }
    ```  

  Respostas 
  - Status: 200 OK  
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // jsonwebtoken gerado
    }
    ```
    
  - Status: 400 Bad Request
    ```json
    { "message": "All fields must be filled" }
    ```
    
  - Status: 401 Unauthorized
    ```json
    { "message": "Invalid email or password" }
    ```
</details>

#### **Endpoint:** `/login/role`
- <details><summary>:closed_lock_with_key: Método GET</summary>  
  Respostas  
    - Status: 200 OK  
      ```json
      { "role": "admin" }
      ```
      
    - Status: 401 Unauthorized
      ```json
      { "message": "Token not found" }
      ```

      ```json
      { "message": "Token must be a valid token" }
      ```
</details>

#### **Endpoint:** `/teams`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      ...
    ]
    ```
</details>

#### **Parâmetro id:** `/teams/:id`
- <details> <summary>Método GET</summary>

  Resposta 
  - Status: 200 OK  
    ```json
    {
      "id": 5,
      "teamName": "Cruzeiro"
    }
    ```
</details>

#### **Endpoint:** `/matches`
- <details><summary>Método GET</summary>

  Resposta 
  - Status: 200 OK  
    ```json
      [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        ...
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
      ]
    ```
</details>

- <details><summary>:closed_lock_with_key: Método POST</summary>
  Requisição  

  ```json
  {
    "homeTeamId": 16, // O valor deve ser o id do time
    "awayTeamId": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 1,
  }
  ```

  Respostas 
  - Status: 201 Created  
    ```json
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
    }
    ```
  
  - Status: 401 Unauthorized
    ```json
    { "message": "Token not found" }
    ```

    ```json
    { "message": "Token must be a valid token" }
    ```
  - Status: 404 Not Found
    ```json
    { "message": "There is no team with such id!" }
    ```
  - Status: 422 Unprocessable Entity
    ```json
    { "message": "It is not possible to create a match with two equal teams" }
    ```
</details>  


#### **Parâmetro inProgress:** `/matches?inProgress=`
- <details>
  <summary>Método GET</summary>
  Opções de query: <i>true</i> ou <i>false</i>  

  Ex:  
    ```
    matches?inProgress=true
    ```

  Resposta 
  - Status: 200 OK  
    ```json
    [
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      }
    ]
    ```
</details>

#### **Parâmetro id:** `/matches/:id`
- <details><summary>:closed_lock_with_key: Método PATCH</summary>
 
  Requisição:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

  Respostas 
  - Status: 200 OK  
    ```json
    { "message": "Updated match!" } 
    ```
  
  - Status: 401 Unauthorized
    ```json
    { "message": "Token not found" }
    ```

    ```json
    { "message": "Token must be a valid token" }
    ```
</details>

#### **Endpoint:** `/matches/:id/finish`
- <details><summary>:closed_lock_with_key: Método PATCH</summary>
  Respostas  
    - Status: 200 OK  
      ```json
      { "message": "Finished" }
      ```
    
    - Status: 401 Unauthorized
      ```json
      { "message": "Token not found" }
      ```

      ```json
      { "message": "Token must be a valid token" }
      ```
</details>

#### **Endpoint:** `/leaderboard
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
        ...
      {
        "name": "Napoli-SC",
        "totalPoints": 2,
        "totalGames": 6,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 4,
        "goalsFavor": 3,
        "goalsOwn": 15,
        "goalsBalance": -12,
        "efficiency": "11.11"
      }
    ]
    ```
</details>

#### **Endpoint:** `/leaderboard/home
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      ...
      {
        "name": "Bahia",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 0,
        "goalsOwn": 4,
        "goalsBalance": -4,
        "efficiency": "0.00"
      }
    ]
    ```
</details>

#### **Endpoint:** `/leaderboard/away`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
        ...
      {
        "name": "Napoli-SC",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 1,
        "goalsOwn": 10,
        "goalsBalance": -9,
        "efficiency": "0.00"
      }
    ]
    ```
</details>  

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>

## Banco de Dados
  1. #### **Diagrama ER**
  ![diagram-er](https://raw.githubusercontent.com/ligiabicalho/Tech-Futebol-Clube/main/tfc-diagrama-er.png)  

  2. #### **Seeders**  
  O banco de dados contém:
  - tabela `users` com usuários válidos com hash das senhas e alguns inválidos, estes útimos utilizados para os testes avaliativos.
  - tabela `teams` com a lista de todos os times que estão participando do campeonato.
  - tabela `matches` com algumas partidadas finalizadas e outras em andamento.

  3. #### **Exemplo de um arquivo `.env`** 
  > Se estiver utilizar Docker as informações do `DB_*` vem do docker-compose, caso contrário se utilizar o MySql instalado na sua máquina.
  ```js
    JWT_SECRET=jwt_secret
    APP_PORT=3001
    DB_USER=seu_user
    DB_PASS=sua_senha
    DB_HOST=localhost
    DB_PORT=3002
  ```

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>

## Instalando localmente
> ⚠️ Configurações mínimas para execução do projeto
> 
> Na sua máquina você deve ter:
> 
> - Preferencialmente Sistema Operacional Distribuição Unix  
> - Node versão 16  
> - Docker  
> - Docker-compose versão >=1.29.2  

1. Clone o repositório   
  `git clone git@github.com:ligiabicalho/Tech-Futebol-Clube.git`
2. Navegue até a pasta do repositório clonado  
    `cd Tech-Futebol-Clube`
3. Instale as dependências no diretório raiz  
  `npm install`

### **Docker**
1. Na raíz do projeto rode o comando:  
  `npm run compose:up`  
2. Em seguida abra o terminal interativo do container:  
  `docker exec -it app_backend sh`  
3. Instale as dependências dentro do container:  
  `npm install`

### **Rodando os testes**
Para rodar os testes de integração desenvolvidos por mim, entre na pasta backend e rode o comando:  
- `npm test`

<p align="right"><a href="#sparkles-bem-vindo-ao-repositório-do-projeto-delivery-app">(De volta ao topo)</a></p>

## Desenvolvedora

<a href="https://github.com/ligiabicalho">
  <img src="https://avatars.githubusercontent.com/u/108960742" width="100px" alt="Ligia Bicalho"/>
  <a href="https://linkedin.com/in/ligiabicalho" target="_blank">
  <p>:information_source: Lígia Bicalho</p>
</a>

## Agradecimentos

A Trybe e seus instrutures pelos ensinamentos, elaboração do desafio e mentorias técnicas.
Aos colegas de turma pelas valiosas discussões, devidamente referenciadas nos comentários do código.

<p align="right"><a href="#sparkles-projeto-tech-futebol-clube-soccer">(De volta ao topo)</a></p>
