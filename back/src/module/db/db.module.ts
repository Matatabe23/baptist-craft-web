import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Импортируем модели
import { Users } from './models/users.repository';
import { RefreshTokens } from './models/refresh-tokens.repository';

const dbList = [Users, RefreshTokens];

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				dialect: 'mysql',
				host: configService.get('dbHost'),
				port: 3306,
				username: configService.get('dbUser'),
				password: configService.get('dbPassword'),
				database: configService.get('dbName'),
				models: dbList,
				autoLoadModels: true,
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		SequelizeModule.forFeature(dbList)
	],
	exports: [SequelizeModule]
})
export class DBModule {}
