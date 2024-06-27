import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { GamesController } from './games.controller';

import { Game } from '../../database/entities/game.entity';
import { GameTile } from '../../database/entities/game-tile.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Game, GameTile])],
	controllers: [GamesController],
	providers: [GamesService, GamesGateway]
})
export class GamesModule {
}
