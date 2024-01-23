# NestJS CRUD API using MongoDB database 

## Descrição

API para requisição de dados meteorológicos de cidades no mundo todo, utilizando o OpenWeatherMap. Também possibilita a criação de webhooks e a consulta do hisórico de requisições salvas em um banco de dados MongoDB.

## Configuração de variáveis ambiente do docker-compose.yml

Configure as variáveis ambiente utilizadas na API e no banco de dados MongoDB no arquivo compose-yml na raiz do projeto com as seguintes especificações:
```
version: "3.8"
services:
  db:
    image: mongo:6.0
    container_name: db
    restart: always
    environment:
      MONGO_URI:{URI do banco de dados MongoDB}

  node-api:
    build:
      context: ./server_app/
      dockerfile: Dockerfile
    container_name: node-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      DB_CONNECTION_STRING:{URI do MongoDB para conectar ao banco de dados}
      API_KEY:{Chave da OpenWeatherMap API}
    depends_on:
      - db
```

## API Endpoints

Para ver a documentação da API, acesse a rota raiz da API em {HOSTNAME}:{PORT}.


## Executando a aplicação
Na raiz do projeto e após configurar as variáveis ambiente no arquivo docker-compose, execute o comando a seguir:
```bash
$ docker-compose up
```

## Test
Para executar testes unitários e teste E2E, vá até a pasta server_app e execute os comandos a seguir:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
