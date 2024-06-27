import { Controller, Get } from '@nestjs/common';

import { Game } from '../../database/entities/game.entity';
import { GamesService } from './games.service';
import { CreateGameDto } from '../../database/dtos/create-game.dto';
import { AccessType } from '../../common/enums/game.enums';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Get('create')
	public async createGame(): Promise<Game> {
		const tiles = this.gamesService.generateGameTiles();
		const createGameDto: CreateGameDto = {
			title: 'First game',
			accessType: AccessType.PUBLIC,
			maxPlayerCount: 4,
			creatorId: 1,
			gameTiles: [...tiles]
		}

		return this.gamesService.createGame(createGameDto);
	}

	@Get('')
	public getTest() {
		return this.gamesService.generateGameTiles();
	}

	// @Get('create')
	// public createGame(): Game {
	// 	return this.gamesService.createGame();
	// }
	//
	// @Get()
	// public getAllGames(): Game[] {
	// 	return this.gamesService.getAllGames();
	// }
	//
	// @Get(':id')
	// public getGame(@Param('id') gameID: string): Game {
	// 	const id = parseInt(gameID);
	//
	// 	return this.gamesService.getGameById(id);
	// }
}
