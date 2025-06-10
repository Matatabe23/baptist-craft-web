import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function DeleteUser(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiParam({
			name: 'id',
			description: 'ID пользователя',
			example: 1
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Пользователь успешно удален'
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
