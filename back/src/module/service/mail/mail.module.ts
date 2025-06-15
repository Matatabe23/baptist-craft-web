import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailRepository } from './mail.repository';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [MailRepository],
	exports: [MailRepository]
})
export class MailModule {}
