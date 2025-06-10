import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users.repository';
import { UsersDto } from './dto/user.dto';
import { TokenRepository } from 'src/module/service/token/token.repository';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		private readonly tokenRepository: TokenRepository
	) {}

	async login(name: string) {
		if (!name) throw new UnauthorizedException('Некорректные данные');

		const lowerName = name.toLowerCase();
		const user = await this.usersRepository.findOne({
			where: { name: lowerName }
		});

		if (!user) throw new NotFoundException('Пользователь не найден');

		const resultDto = new UsersDto(user.dataValues);

		const accessToken = this.tokenRepository.generateToken(resultDto, '15m');

		return { accessToken, user: { ...resultDto } };
	}
}
