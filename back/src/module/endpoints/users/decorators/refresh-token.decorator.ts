import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function RefreshToken(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiBody({
			type: RefreshTokenDto,
			description: 'Refresh token для обновления'
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Токены успешно обновлены',
			schema: {
				type: 'object',
				properties: {
					accessToken: { type: 'string' },
					refreshToken: { type: 'string' }
				}
			}
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 401,
			description: 'Недействительный refresh token',
			type: ErrorDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
