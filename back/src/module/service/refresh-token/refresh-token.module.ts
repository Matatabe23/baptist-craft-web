import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokens } from 'src/module/db/models/refresh-tokens.repository';
import { RefreshTokenService } from './refresh-token.service';
import { TokenModule } from '../token/token.module';

@Module({
	imports: [SequelizeModule.forFeature([RefreshTokens]), TokenModule],
	providers: [RefreshTokenService],
	exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
