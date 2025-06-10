import { IsOptional, IsString, IsNumber, IsBoolean, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUST_BE_STRING, MUST_BE_NUMBER, MUST_BE_BOOLEAN } from 'src/const/errorConst';

export class UpdateUserDto {
	@ApiProperty({
		description: 'Логин пользователя',
		example: 'ivan_ivanov',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	login?: string;

	@ApiProperty({
		description: 'Полное имя пользователя',
		example: 'Иван Иванов',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	fullName?: string;

	@ApiProperty({
		description: 'Email пользователя',
		example: 'ivan@example.com',
		required: false
	})
	@IsOptional()
	@IsEmail({}, { message: 'Неверный формат email' })
	email?: string;

	@ApiProperty({
		description: 'Ссылка на аватар пользователя',
		example: 'https://example.com/avatar.jpg',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	avatarUrl?: string;

	@ApiProperty({
		description: 'Биография пользователя',
		example: 'Разработчик из Москвы',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	bio?: string;

	@ApiProperty({
		description: 'Дата рождения',
		example: '1990-01-01',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	dateOfBirth?: string;

	@ApiProperty({
		description: 'Подтвержден ли email',
		example: false,
		required: false
	})
	@IsOptional()
	@IsBoolean({ message: MUST_BE_BOOLEAN })
	isEmailVerified?: boolean;

	@ApiProperty({
		description: 'Роль пользователя',
		example: 'user',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	role?: string;

	@ApiProperty({
		description: 'Идентификатор Telegram пользователя',
		example: 123456789,
		required: false
	})
	@IsOptional()
	@IsNumber({}, { message: MUST_BE_NUMBER })
	telegramId?: number;

	@ApiProperty({
		description: 'Является ли пользователь членом команды',
		example: false,
		required: false
	})
	@IsOptional()
	@IsBoolean({ message: MUST_BE_BOOLEAN })
	isTeamMember?: boolean;

	@ApiProperty({
		description: 'Количество игровых монет пользователя',
		example: 100,
		required: false
	})
	@IsOptional()
	@IsNumber({}, { message: MUST_BE_NUMBER })
	coin?: number;
}
