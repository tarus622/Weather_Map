import { Module, Global } from '@nestjs/common';
import {
  AppControllerLoggerService,
  AppServiceLoggerService,
  HttpExceptionLoggerService,
  HelperApiLoggerService,
  RequestHistoryLoggerService,
  LocationRepositoryLoggerService,
  WebhookRepositoryLoggerService,
} from './logger/logger.service';

@Global()
@Module({
  providers: [
    AppControllerLoggerService,
    AppServiceLoggerService,
    HttpExceptionLoggerService,
    HelperApiLoggerService,
    RequestHistoryLoggerService,
    LocationRepositoryLoggerService,
    WebhookRepositoryLoggerService,
  ],
  exports: [
    AppControllerLoggerService,
    AppServiceLoggerService,
    HttpExceptionLoggerService,
    HelperApiLoggerService,
    RequestHistoryLoggerService,
    LocationRepositoryLoggerService,
    WebhookRepositoryLoggerService,
  ],
})
export class LoggerModule {}
