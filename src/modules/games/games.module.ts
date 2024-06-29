import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { GamesController } from './games.controller';

import { Game } from '../../database/entities/game.entity';
import { GameTile } from '../../database/entities/game-tile.entity';
import { GameResource } from '../../database/entities/game-resource.entity';
import { GameDjinn } from '../../database/entities/game-djinn.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Game, GameTile, GameResource, GameDjinn])],
	controllers: [GamesController],
	providers: [GamesService, GamesGateway]
})
export class GamesModule {
}
