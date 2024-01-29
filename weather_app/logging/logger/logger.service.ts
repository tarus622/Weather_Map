import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import {
  appControllerLoggerConfig,
  appServiceLoggerConfig,
  httpFilterLoggerConfig,
  helperApiLoggerConfig,
  requestHistoryLoggerConfig,
  locationRepositoryLoggerConfig,
  webhookRepositoryLoggerConfig,
} from './loggers';

type LogObject = {
  [key: string]: any;
};

@Injectable()
abstract class BaseLoggerService {
  protected abstract logger: winston.Logger;

  error(logObject: LogObject | string, context?: string): void {
    if (typeof logObject === 'string') {
      this.logger.error({
        message: logObject,
        context,
      });
    } else {
      this.logger.error({
        ...logObject,
        context,
      });
    }
  }

  info(logObject: LogObject | string, context?: string): void {
    if (typeof logObject === 'string') {
      this.logger.info({
        message: logObject,
        context,
      });
    } else {
      this.logger.info({
        ...logObject,
        context,
      });
    }
  }

  warn(logObject: LogObject | string, context?: string): void {
    if (typeof logObject === 'string') {
      this.logger.warn({
        message: logObject,
        context,
      });
    } else {
      this.logger.warn({
        ...logObject,
        context,
      });
    }
  }

  debug(logObject: LogObject | string, context?: string): void {
    if (typeof logObject === 'string') {
      this.logger.debug({
        message: logObject,
        context,
      });
    } else {
      this.logger.debug({
        ...logObject,
        context,
      });
    }
  }

  log(level: string, logObject: LogObject | string, context?: string): void {
    if (typeof logObject === 'string') {
      this.logger.log({
        level,
        message: logObject,
        context,
      });
    } else {
      this.logger.log(level, {
        ...logObject,
        context,
      });
    }
  }
}

winston.loggers.add('AppControllerLogger', appControllerLoggerConfig);
winston.loggers.add('AppServiceLogger', appServiceLoggerConfig);
winston.loggers.add('HttpExceptionFilterLogger', httpFilterLoggerConfig);
winston.loggers.add('HelperApiLogger', helperApiLoggerConfig);
winston.loggers.add('RequestHistoryLogger', requestHistoryLoggerConfig);
winston.loggers.add('LocationRepositoryLogger', locationRepositoryLoggerConfig);
winston.loggers.add('WebhookRepositoryLogger', webhookRepositoryLoggerConfig);

@Injectable()
export class AppControllerLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get('AppControllerLogger');
}

@Injectable()
export class AppServiceLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get('AppServiceLogger');
}

@Injectable()
export class HttpExceptionLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get(
    'HttpExceptionFilterLogger',
  );
}

@Injectable()
export class HelperApiLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get('HelperApiLogger');
}

@Injectable()
export class RequestHistoryLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get(
    'RequestHistoryLogger',
  );
}

@Injectable()
export class LocationRepositoryLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get(
    'LocationRepositoryLogger',
  );
}

@Injectable()
export class WebhookRepositoryLoggerService extends BaseLoggerService {
  protected logger: winston.Logger = winston.loggers.get(
    'WebhookRepositoryLogger',
  );
}
