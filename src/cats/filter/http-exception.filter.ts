// filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// use the `Catch` decoration to handle the custom exception
@Catch(HttpException)
// complete a class with `ExceptionFilter` interface
export class HttpExceptionFilter implements ExceptionFilter {
  // implements the `catch` method,
  // the `catch` Method to implement a custom exception filter.
  /**
   * @param exception the class of the exception being handled
   * @param host used to access an array of arguments for the in-flight request
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      url: request.url,
      timestamp: new Date().toISOString(),
      method: request.method,
      message: exception.message,
    });
  }
}
