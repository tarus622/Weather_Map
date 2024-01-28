import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, headers, query } = req;
    const start = Date.now();

    this.logger.log(
      `Request - Method: ${method}, URL: ${url}, Headers: ${JSON.stringify(
        headers,
      )}, Query: ${JSON.stringify(query)}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - start;

      if (res.statusCode >= 200 && res.statusCode < 400) {
        this.logger.log(
          `Response - Status Code: ${res.statusCode}, Duration: ${duration}ms`,
        );
      } else {
        this.logger.warn(
          `Response - Status Code: ${res.statusCode}, Duration: ${duration}ms`,
        );
      }
    });

    next();
  }
}
