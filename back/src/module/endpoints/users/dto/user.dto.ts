import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUST_BE_BOOLEAN, MUST_BE_NUMBER, MUST_BE_STRING } from 'src/const/errorConst';

export class UsersDto {
	@ApiProperty({
		description: 'Уникальный идентификатор пользователя',
		example: 1
	})
	@IsNotEmpty()
	@IsNumber({}, { message: MUST_BE_NUMBER })
	id: number;

	@ApiProperty({
		description: 'Логин пользователя',
		example: 'ivan_ivanov'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	login: string;

	@ApiProperty({
		description: 'Полное имя пользователя',
		example: 'Иван Иванов'
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
	@IsString({ message: MUST_BE_STRING })
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
	@IsDate()
	dateOfBirth?: Date;

	@ApiProperty({
		description: 'Подтвержден ли email',
		example: false,
		required: false
	})
	@IsOptional()
	@IsBoolean({ message: MUST_BE_BOOLEAN })
	isEmailVerified?: boolean;

	@ApiProperty({
		description: 'Дата создания аккаунта',
		example: '2024-01-01T00:00:00.000Z'
	})
	@IsNotEmpty()
	@IsDate()
	createdAt: Date;

	@ApiProperty({
		description: 'Дата последнего обновления',
		example: '2024-01-01T00:00:00.000Z'
	})
	@IsNotEmpty()
	@IsDate()
	updatedAt: Date;

	@ApiProperty({
		description: 'Дата последнего входа',
		example: '2024-01-01T00:00:00.000Z',
		required: false
	})
	@IsOptional()
	@IsDate()
	lastLoginAt?: Date;

	constructor(user: any) {
		this.id = user.id;
		this.login = user.login;
		this.fullName = user.fullName;
		this.email = user.email;
		this.avatarUrl = user.avatarUrl;
		this.bio = user.bio;
		this.dateOfBirth = user.dateOfBirth;
		this.isEmailVerified = user.isEmailVerified;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
		this.lastLoginAt = user.lastLoginAt;
	}
}
