import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginPasswordDto } from '../dto/login-password.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function LoginPassword(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiBody({
			type: LoginPasswordDto,
			description: 'Данные для входа по паролю'
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Успешный вход пользователя',
			schema: {
				type: 'object',
				properties: {
					accessToken: { type: 'string' },
					refreshToken: { type: 'string' },
					user: { $ref: '#/components/schemas/UsersDto' }
				}
			}
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 401,
			description: 'Неверные учетные данные',
			type: ErrorDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
