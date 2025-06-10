import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RefreshTokens } from 'src/module/db/models/refresh-tokens.repository';
import { TokenRepository } from '../token/token.repository';

@Injectable()
export class RefreshTokenService {
	constructor(
		@InjectModel(RefreshTokens)
		private readonly refreshTokensRepository: typeof RefreshTokens,
		private readonly tokenRepository: TokenRepository
	) {}

	async createRefreshToken(userId: number, deviceInfo?: string): Promise<string> {
		// Генерируем refresh token
		const refreshToken = this.tokenRepository.generateToken(
			{ userId, type: 'refresh' },
			'7d',
			true
		);

		// Вычисляем дату истечения (7 дней)
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		// Сохраняем в базу данных
		await this.refreshTokensRepository.create({
			token: refreshToken,
			expiresAt,
			userId,
			deviceInfo
		});

		return refreshToken;
	}

	async validateRefreshToken(token: string): Promise<any> {
		// Проверяем токен в базе данных
		const refreshTokenRecord = await this.refreshTokensRepository.findOne({
			where: { token }
		});

		if (!refreshTokenRecord) {
			throw new UnauthorizedException('Refresh token not found');
		}

		// Проверяем срок действия
		if (new Date() > refreshTokenRecord.expiresAt) {
			// Удаляем просроченный токен
			await refreshTokenRecord.destroy();
			throw new UnauthorizedException('Refresh token expired');
		}

		// Валидируем JWT токен
		const payload = this.tokenRepository.validateRefreshToken(token);

		return {
			userId: payload.userId,
			refreshTokenRecord
		};
	}

	async refreshAccessToken(
		refreshToken: string
	): Promise<{ accessToken: string; newRefreshToken: string }> {
		const { userId } = await this.validateRefreshToken(refreshToken);

		// Генерируем новый access token
		const accessToken = this.tokenRepository.generateToken(
			{ userId, type: 'access' },
			'15m',
			false
		);

		// Генерируем новый refresh token
		const newRefreshToken = await this.createRefreshToken(userId);

		// Удаляем старый refresh token
		await this.refreshTokensRepository.destroy({
			where: { token: refreshToken }
		});

		return {
			accessToken,
			newRefreshToken
		};
	}

	async revokeRefreshToken(token: string): Promise<void> {
		await this.refreshTokensRepository.destroy({
			where: { token }
		});
	}

	async revokeAllUserTokens(userId: number): Promise<void> {
		await this.refreshTokensRepository.destroy({
			where: { userId }
		});
	}

	async getUserTokens(userId: number): Promise<RefreshTokens[]> {
		return await this.refreshTokensRepository.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']]
		});
	}

	async cleanupExpiredTokens(): Promise<number> {
		const result = await this.refreshTokensRepository.destroy({
			where: {
				expiresAt: {
					[Op.lt]: new Date()
				}
			}
		});

		return result;
	}
}
