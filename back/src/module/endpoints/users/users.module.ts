import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from 'src/module/service/token/token.module';
import { RefreshTokenModule } from 'src/module/service/refresh-token/refresh-token.module';
import { DBModule } from 'src/module/db/db.module';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
	imports: [DBModule, TokenModule, RefreshTokenModule],
	controllers: [UsersController],
	providers: [UsersService, AuthGuard]
})
export class UsersModule {}
