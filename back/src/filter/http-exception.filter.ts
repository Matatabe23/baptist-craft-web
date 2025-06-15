import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const status = exception.getStatus();
		const responseData = exception.getResponse();

		let message: string;

		if (typeof responseData === 'string') {
			message = responseData;
		} else if (typeof responseData === 'object') {
			const res = responseData as any;
			message = res.message || exception.message || '';
		} else {
			message = exception.message;
		}

		response.status(status).json({
			status,
			Message: message, // Ключ с большой буквы
			message,
			path: request.url,
			timestamp: new Date().toISOString()
		});
	}
}
