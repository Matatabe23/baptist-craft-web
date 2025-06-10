import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class RefreshTokenDto {
	@ApiProperty({
		description: 'Refresh token для обновления access token',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	refreshToken: string;
}

export class RevokeTokenDto {
	@ApiProperty({
		description: 'Refresh token для отзыва',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	refreshToken: string;
}
