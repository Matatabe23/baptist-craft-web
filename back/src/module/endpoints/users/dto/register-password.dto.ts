import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class RegisterPasswordDto {
	@ApiProperty({
		description: 'Логин пользователя',
		example: 'ivan_ivanov'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	login: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'password123'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	password: string;

	@ApiProperty({
		description: 'Полное имя пользователя',
		example: 'Иван Иванов'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	fullName: string;

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
}
