import { ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function UpdateUser(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiParam({
			name: 'id',
			description: 'ID пользователя',
			example: 1
		})(target, propertyKey, descriptor);
		ApiBody({
			type: UpdateUserDto,
			description: 'Данные для обновления пользователя'
		})(target, propertyKey, descriptor);
		ApiResponse({
			status: 200,
			description: 'Пользователь успешно обновлен',
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
