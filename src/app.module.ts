import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
			database: 'five-tribes',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		GamesModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
