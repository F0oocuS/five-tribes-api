import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesModule } from './modules/games/games.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

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
		GamesModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
