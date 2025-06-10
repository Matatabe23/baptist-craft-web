import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { DBModule } from './module/db/db.module';

import { UsersModule } from './module/endpoints/users/users.module';

import { S3Module } from './module/service/s3/s3.module';
import { FileModule } from './module/service/files/files.module';
import { TokenModule } from './module/service/token/token.module';

import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true
		}),
		EventEmitterModule.forRoot(),
		DBModule,

		UsersModule,

		S3Module,
		FileModule,
		TokenModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
