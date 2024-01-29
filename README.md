# API NestJS para consulta de dados meteorológicos

## Descrição

API para requisição de dados meteorológicos de cidades no mundo todo, utilizando o [OpenWeatherMap](https://openweathermap.org/). Também possibilita a criação de webhooks e a consulta do hisórico de requisições salvas em um banco de dados MongoDB.

## Tecnologias
- NodeJS
- NestJS
- Docker 
- Jest 
- MongoDB
- Swagger
- Mongoose
- Winston

## Atalhos
* [weather_app/](weather_app/) - pasta raiz da aplicação NestJS
* [tests/](weather_app/src/tests/) - pasta com os arquivos de testes unitários
* [logging/](weather_app/logging) - pasta com as configurações de logging

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
      API_KEY: {open_api_key_example}
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

2- Execute o script "start" após configurar a string de conexão do MongoDB e a chave da Open Weather API como variáveis de ambiente

```bash
$ DB_CONNECTION_STRING={mongodb://example} API_KEY={open_api_key_example} npm start
```

## API Endpoints

`GET` /weather/:city/:country
**Descrição:**
- Faz uma requisição para a API do OpenWeatherMap retornando as condições climáticas atuais da cidade pesquisada.
- Adiciona a requisição em um documento do banco de dados MongoDB que guarda o histórico de requisições.
- Caso haja webhooks para a localidade da requisição, envia uma requisição POST para a URL cadastrada.
**Parâmetros de Consulta:**
  - city: obrigatório
  - country: obrigatório, deve ter o tamanho exato de 2 caracteres.

`GET` /history
**Descrição:**
- Recupera o histórico de requisições realizadas que está armazenado no banco de dados MongoDB.

`POST` /webhook
**Descrição:**
- Cadastra um novo webhook com o seguinte formato:

**Parâmetros de Corpo (Body):**
```json
{
  "city": "string", // Deve ser uma string não vazia
  "country": "string", // Deve ser uma string não vazia com exatamente 2 caracteres
  "webhookURL": "string" // Deve ser uma string não vazia
}
```

Para ver mais detalhes sobre a documentação da API no Swagger, acesse a rota raiz da aplicação em {HOSTNAME}:{PORT}.

## Test

Para executar testes unitários e teste E2E, vá até a pasta [weather_app/](weather_app/) e execute os comandos a seguir:

```bash
# unit tests
$ npm run test

Observação: para executar testes e2e com sucesso, é necessário configurar a string de conexão do MongoDB
# e2e tests
$ DB_CONNECTION_STRING={mongodb://example} npm run test:e2e
```
