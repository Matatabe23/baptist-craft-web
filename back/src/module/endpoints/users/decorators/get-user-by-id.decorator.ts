import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersDto } from '../dto/user.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function GetUserById(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiParam({
			name: 'id',
			description: 'ID пользователя',
			example: 1
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Пользователь найден',
			type: UsersDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 404,
			description: 'Пользователь не найден',
			type: ErrorDto
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
