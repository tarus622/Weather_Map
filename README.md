# API NestJS para consulta de dados meteorológicos

## Descrição

API para requisição de dados meteorológicos de cidades no mundo todo, utilizando o [OpenWeatherMap](https://openweathermap.org/). Também possibilita a criação de webhooks e a consulta do hisórico de requisições salvas em um banco de dados MongoDB.

## Atalhos
* [weather_app/](weather_app/) - pasta raiz da aplicação NestJS
* [tests/](weather_app/src/tests/) - pasta com os arquivos de testes unitários

## Executando a aplicação com docker-compose

Configure as variáveis ambiente utilizadas na API e no banco de dados MongoDB no arquivo docker-compose.yml na raiz do projeto com as seguintes especificações:

```
version: "3.8"
services:
  db:
    image: mongo:6.0
    container_name: db
    restart: always
    environment:
      # URI do banco de dados MongoDB
      MONGO_URI: {mongodb://example}

  node-api:
    build:
      context: ./server_app/
      dockerfile: Dockerfile
    container_name: node-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      # URI do banco de dados MongoDB
      DB_CONNECTION_STRING: {mongodb://example}
      # Chave da OpenWeatherMap API
      API_KEY: {example}
    depends_on:
      - db
```

Na pasta raíz do projeto [Weather_Map/](/) e após configurar as variáveis ambiente no arquivo docker-compose.yml, execute o comando a seguir:

```bash
$ docker-compose up
```

## Executando a aplicação localmente

1- No diretório [weather_app/](weather_app/) execute o comando:

```bash
$ npm install
```

2- Crie um arquivo .env e configure as seguintes variáveis ambiente:
```
API_KEY=
DB_CONNECTION_STRING=
```

3- Vá até o arquivo [app.module.ts](weather_app/src/app.module.ts) e procure o arquivo "app.module.ts"

4- Descomente as seguintes linhas:
```
// import \* as dotenv from 'dotenv';
// const config = { path: '.env' };

// dotenv.config(config);
```

5- Em seguida, execute o seguinte comando:

```bash
$ npm start
```

## API Endpoints

`GET` /weather/:city/:country

- Faz uma requisição para a API do OpenWeatherMap retornando as condições climáticas atuais da cidade pesquisada.
- Adiciona a requisição em um documento do banco de dados MongoDB que guarda o histórico de requisições.
- Caso haja webhooks para a localidade da requisição, envia uma requisição POST para a URL cadastrada.

Param   | Type | Size | Required
--------- | :------: | -------: | :------:
city | string |  | true
country | string | 2 | true
---

`GET` /history

- Recupera o histórico de requisições realizadas que está armazenado no banco de dados MongoDB.

`POST` /webhook

- Cadastra um novo webhook com o seguinte formato:

```json
{
  "city": "London",
  "country": "GB",
  "webhookURL": "https://example.com/webhook-endpoint"
}
```
# Request body:
Field | Type | Required
-------- | :------: | -------:
city | string | true
country | string | 2 | true
webhookURL | string | true

Para ver mais detalhes sobre a documentação da API no Swagger, acesse a rota raiz da aplicação em {HOSTNAME}:{PORT}.

## Test

Para executar testes unitários e teste E2E, vá até a pasta server_app e execute os comandos a seguir:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
