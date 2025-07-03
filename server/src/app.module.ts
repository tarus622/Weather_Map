import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location, LocationSchema } from './schemas/location.schema';
import { Webhook, WebhookSchema } from './schemas/webhooks.schema';
import { LocationRepository } from './repositories/location.repository';
import { WebhookRepository } from './repositories/webhook.repository';
import { RequestHistoryHelper } from './helpers/request-history';
import { LoggerModule } from '../logging/logger.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Webhook.name, schema: WebhookSchema },
    ]),
    LoggerModule,
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
export class AppModule {}
