import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
	ConflictException,
	BadRequestException,
	ForbiddenException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/module/db/models/users.repository';
import { UsersDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterPasswordDto } from './dto/register-password.dto';
import { LoginPasswordDto } from './dto/login-password.dto';
import { TokenRepository } from 'src/module/service/token/token.repository';
import { RefreshTokenService } from 'src/module/service/refresh-token/refresh-token.service';
import { LoginPasswordLauncherDto } from './dto/login-password-launcher.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		private readonly tokenRepository: TokenRepository,
		private readonly refreshTokenService: RefreshTokenService
	) {}

	async register(registerDto: RegisterPasswordDto) {
		// Проверяем, существует ли пользователь с таким логином
		const existingUserByLogin = await this.usersRepository.findOne({
			where: { login: registerDto.login }
		});

		if (existingUserByLogin) {
			throw new ConflictException('Пользователь с таким логином уже существует');
		}

		// Проверяем, существует ли пользователь с таким email
		const existingUserByEmail = await this.usersRepository.findOne({
			where: { email: registerDto.email }
		});

		if (existingUserByEmail) {
			throw new ConflictException('Пользователь с таким email уже существует');
		}

		// Хешируем пароль
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

		// Создаем нового пользователя
		const newUser = await this.usersRepository.create({
			login: registerDto.login,
			password: hashedPassword,
			email: registerDto.email,
			fullName: registerDto.fullName,
			avatarUrl: registerDto.avatarUrl,
			bio: registerDto.bio,
			isEmailVerified: false
		});

		const resultDto = new UsersDto(newUser.dataValues);
		const accessToken = this.tokenRepository.generateToken(resultDto, '15m');
		const refreshToken = await this.refreshTokenService.createRefreshToken(
			newUser.id,
			'Registration'
		);

		return {
			accessToken,
			refreshToken,
			user: { ...resultDto }
		};
	}

	async login(loginDto: LoginPasswordDto) {
		// Ищем пользователя по логину
		const user = await this.usersRepository.findOne({
			where: { login: loginDto.login }
		});

		if (!user) {
			throw new UnauthorizedException('Неверные учетные данные');
		}

		// Проверяем пароль
		const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Неверные учетные данные');
		}

		// Обновляем время последнего входа
		await user.update({ lastLoginAt: new Date() });

		const resultDto = new UsersDto(user.dataValues);
		const accessToken = this.tokenRepository.generateToken(resultDto, '15m');
		const refreshToken = await this.refreshTokenService.createRefreshToken(
			user.id,
			loginDto.deviceInfo
		);

		return {
			accessToken,
			refreshToken,
			user: { ...resultDto }
		};
	}

	async loginLauncher(loginDto: LoginPasswordLauncherDto) {
		if (!loginDto.Login || !loginDto.Password) {
			throw new BadRequestException({ Message: 'Login and Password are required' });
		}

		// Ищем пользователя по логину
		const user = await this.usersRepository.findOne({
			where: { login: loginDto.Login }
		});

		if (!user) {
			throw new NotFoundException({ Message: 'Пользователь не найден' });
		}

		// Здесь можно добавить проверку блокировки
		console.log(user);
		if (user.isBlocked) {
			throw new ForbiddenException({ Message: 'Пользователь заблокирован' });
		}

		// Проверяем пароль
		const isPasswordValid = await bcrypt.compare(loginDto.Password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException({ Message: 'Неверный логин или пароль' });
		}

		// Обновляем время последнего входа
		await user.update({ lastLoginAt: new Date() });

		// Возвращаем ожидаемый ответ
		return {
			Login: user.login,
			UserUuid: user.uuid,
			Message: 'Успешная авторизация'
		};
	}

	async refreshTokens(refreshToken: string) {
		return await this.refreshTokenService.refreshAccessToken(refreshToken);
	}

	async revokeToken(refreshToken: string) {
		await this.refreshTokenService.revokeRefreshToken(refreshToken);
		return { message: 'Токен успешно отозван' };
	}

	async revokeAllUserTokens(userId: number) {
		await this.refreshTokenService.revokeAllUserTokens(userId);
		return { message: 'Все токены пользователя отозваны' };
	}

	async getUserTokens(userId: number) {
		return await this.refreshTokenService.getUserTokens(userId);
	}

	async findAll(page: number = 1, limit: number = 10) {
		const offset = (page - 1) * limit;

		const { rows: users, count } = await this.usersRepository.findAndCountAll({
			limit,
			offset,
			order: [['id', 'ASC']]
		});

		const usersDto = users.map((user) => new UsersDto(user.dataValues));

		return {
			users: usersDto,
			total: count,
			page,
			limit,
			totalPages: Math.ceil(count / limit)
		};
	}

	async findById(id: number) {
		const user = await this.usersRepository.findByPk(id);

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		return new UsersDto(user.dataValues);
	}

	async update(id: number, updateDto: UpdateUserDto) {
		const user = await this.usersRepository.findByPk(id);

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		// Если обновляется логин, проверяем уникальность
		if (updateDto.login) {
			const existingUser = await this.usersRepository.findOne({
				where: {
					login: updateDto.login,
					id: { [Op.ne]: id }
				}
			});

			if (existingUser) {
				throw new ConflictException('Пользователь с таким логином уже существует');
			}
		}

		await user.update(updateDto);
		return new UsersDto(user.dataValues);
	}

	async delete(id: number) {
		const user = await this.usersRepository.findByPk(id);

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		// Отзываем все токены пользователя
		await this.refreshTokenService.revokeAllUserTokens(id);

		await user.destroy();
		return { message: 'Пользователь успешно удален' };
	}
}
