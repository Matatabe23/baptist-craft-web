import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterPasswordDto } from '../dto/register-password.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function RegisterPassword(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiBody({
			type: RegisterPasswordDto,
			description: 'Данные для регистрации с паролем'
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 201,
			description: 'Пользователь успешно зарегистрирован',
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
			status: 400,
			description: 'Некорректные данные',
			type: ErrorDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 409,
			description: 'Пользователь уже существует',
			type: ErrorDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
