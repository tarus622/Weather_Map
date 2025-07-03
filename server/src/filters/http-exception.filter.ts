import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../interfaces/error-response';
import { HttpExceptionLoggerService } from '../../logging/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly loggerService = new HttpExceptionLoggerService();

  isObjectWithMessage(obj: any): obj is { message: string } {
    return typeof obj === 'object' && 'message' in obj;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | undefined;

    if (this.isObjectWithMessage(exceptionResponse)) {
      message = exceptionResponse.message;
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: message,
    };

    this.loggerService.error(
      `[${HttpExceptionFilter.name}] HTTP Exception - Status: ${status}, Path: ${errorResponse.path}, Message: ${errorResponse.message}`,
      exception.stack,
    );

    response.status(status).json(errorResponse);
  }
}
