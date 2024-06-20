import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { GamesModule } from './modules/games/games.module';

@Module({
	imports: [GamesModule],
	controllers: [AppController],
	providers: [AppService, ChatGateway],
})
export class AppModule {}
