import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersDto } from '../dto/user.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function GetUsers(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiQuery({
			name: 'page',
			description: 'Номер страницы',
			example: 1,
			required: false
		})(target, propertyKey, descriptor);
		ApiQuery({
			name: 'limit',
			description: 'Количество элементов на странице',
			example: 10,
			required: false
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Список пользователей получен успешно',
			type: [UsersDto]
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
