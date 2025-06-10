import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class LoginPasswordDto {
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
		description: 'Информация об устройстве',
		example: 'Chrome 120.0.0.0 Windows 10',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	deviceInfo?: string;
}
