import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([]),
		AuthModule
	],
	controllers: [PlayerController],
	providers: [PlayerService]
})
export class PlayerModule {}