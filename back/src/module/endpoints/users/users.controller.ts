import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser } from './decorators/login-user.decorator';

@Controller('user')
@ApiTags('Пользователи')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('login')
	@LoginUser()
	async login(@Query('name') name: string) {
		try {
			const result = await this.userService.login(name);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
