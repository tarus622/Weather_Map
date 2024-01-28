import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location, LocationSchema } from './schemas/location.schema';
import { Webhook, WebhookSchema } from './schemas/webhooks.schema';
import { LocationRepository } from './repositories/location.repository';
import { WebhookRepository } from './repositories/webhook.repository';
import { RequestHistoryHelper } from './helpers/request-history';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Webhook.name, schema: WebhookSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LocationRepository,
    WebhookRepository,
    RequestHistoryHelper,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
