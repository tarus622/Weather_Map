import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Orpen Weather Api')
    .setDescription(
      `API para requisição de dados meteorológicos de cidades no mundo todo, utilizando o [OpenWeatherMap](https://openweathermap.org/). Também possibilita a criação de webhooks e a possibilidade de consultar o hisórico de requisições salvas em um banco de dados MongoDB`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
