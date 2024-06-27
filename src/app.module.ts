import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { GamesModule } from './modules/games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'rootroot',
			database: 'five_tribes',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		GamesModule
	],
	controllers: [AppController],
	providers: [AppService, ChatGateway],
})
export class AppModule {}
