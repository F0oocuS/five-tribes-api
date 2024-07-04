import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameController } from './game.controller';

import { Game } from '../../database/entities/game.entity';
import { GameTile } from '../../database/entities/game-tile.entity';
import { GameResource } from '../../database/entities/game-resource.entity';
import { GameDjinn } from '../../database/entities/game-djinn.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Game, GameTile, GameResource, GameDjinn])],
	controllers: [GameController],
	providers: [GameService, GameGateway]
})
export class GameModule {
}
