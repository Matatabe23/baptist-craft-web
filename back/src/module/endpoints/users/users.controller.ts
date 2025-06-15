import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	Query,
	HttpException,
	HttpStatus,
	ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { GetUsers } from './decorators/get-users.decorator';
import { GetUserById } from './decorators/get-user-by-id.decorator';
import { UpdateUser } from './decorators/update-user.decorator';
import { DeleteUser } from './decorators/delete-user.decorator';
import { LoginPassword } from './decorators/login-password.decorator';
import { RegisterPassword } from './decorators/register-password.decorator';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterPasswordDto } from './dto/register-password.dto';
import { LoginPasswordDto } from './dto/login-password.dto';
import { RefreshTokenDto, RevokeTokenDto } from './dto/refresh-token.dto';
import { LoginPasswordLauncherDto } from './dto/login-password-launcher.dto';

@Controller('user')
@ApiTags('Пользователи')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post('register')
	@RegisterPassword()
	async register(@Body() registerDto: RegisterPasswordDto) {
		try {
			const result = await this.userService.register(registerDto);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Post('login')
	@LoginPassword()
	async login(@Body() loginDto: LoginPasswordDto) {
		try {
			const result = await this.userService.login(loginDto);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Post('login-launcher')
	@LoginPassword()
	async loginLauncher(@Body() loginDto: LoginPasswordLauncherDto) {
		try {
			const result = await this.userService.loginLauncher(loginDto);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Post('refresh')
	@RefreshToken()
	async refreshTokens(@Body() refreshDto: RefreshTokenDto) {
		try {
			const result = await this.userService.refreshTokens(refreshDto.refreshToken);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Post('revoke')
	async revokeToken(@Body() revokeDto: RevokeTokenDto) {
		try {
			const result = await this.userService.revokeToken(revokeDto.refreshToken);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Delete('tokens/:userId')
	async revokeAllUserTokens(@Param('userId', ParseIntPipe) userId: number) {
		try {
			const result = await this.userService.revokeAllUserTokens(userId);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Get('tokens/:userId')
	async getUserTokens(@Param('userId', ParseIntPipe) userId: number) {
		try {
			const result = await this.userService.getUserTokens(userId);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Get()
	@GetUsers()
	async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
		try {
			const result = await this.userService.findAll(page, limit);
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

	@Get(':id')
	@GetUserById()
	async findById(@Param('id', ParseIntPipe) id: number) {
		try {
			const result = await this.userService.findById(id);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Put(':id')
	@UpdateUser()
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateUserDto) {
		try {
			const result = await this.userService.update(id, updateDto);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Delete(':id')
	@DeleteUser()
	async delete(@Param('id', ParseIntPipe) id: number) {
		try {
			const result = await this.userService.delete(id);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@Post('confirm-email')
	async confirmEmail(@Body() body: { token: string }) {
		try {
			const result = await this.userService.confirmEmail(body.token);
			return result;
		} catch (e) {
			throw new HttpException(
				{
					status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
					message: e.message
				},
				e.status || HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
