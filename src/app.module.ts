import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'rootroot',
			database: 'five-tribes',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		AuthModule,
		UserModule,
		GameModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
