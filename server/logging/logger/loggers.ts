import * as winston from 'winston';
const { combine, timestamp, prettyPrint, json, errors, colorize } =
  winston.format;

const appControllerLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/app-controller-logs',
      filename: 'app-controller-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/app-controller-logs',
      filename: 'app-controller-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'AppControllerLogger' },
};

const appServiceLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/app-service-logs',
      filename: 'app-service-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/app-service-logs',
      filename: 'app-service-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'AppServiceLogger' },
};

const httpFilterLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/http-filter-logs',
      filename: 'http-filter-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/http-filter-logs',
      filename: 'http-filter-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'HttpExceptionFilterLogger' },
};

const helperApiLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/helper-api-logs',
      filename: 'helper-api-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/helper-api-logs',
      filename: 'helper-api-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'HttpExceptionFilter' },
};

const requestHistoryLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/request-history-logs',
      filename: 'request-history-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/request-history-logs',
      filename: 'request-history-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'HttpExceptionFilter' },
};

const locationRepositoryLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/location-repository-logs',
      filename: 'location-repository-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/location-repository-logs',
      filename: 'location-repository-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'HttpExceptionFilter' },
};

const webhookRepositoryLoggerConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    json(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      dirname: './logs/webhook-repository-logs',
      filename: 'webhook-repository-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname: './logs/webhook-repository-logs',
      filename: 'webhook-repository-info.log',
      level: 'info',
    }),
    new winston.transports.Console({}),
  ],
  defaultMeta: { service: 'HttpExceptionFilter' },
};

export {
  appControllerLoggerConfig,
  appServiceLoggerConfig,
  httpFilterLoggerConfig,
  helperApiLoggerConfig,
  requestHistoryLoggerConfig,
  locationRepositoryLoggerConfig,
  webhookRepositoryLoggerConfig,
};
