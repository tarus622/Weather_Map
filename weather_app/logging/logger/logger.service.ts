import { Injectable } from '@nestjs/common';
import { customColors } from '../config/logger.config';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.colorize({ all: true, colors: customColors }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: './logs',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: './logs',
          filename: 'info.log',
          level: 'info',
        }),
      ],
    });
  }
}
