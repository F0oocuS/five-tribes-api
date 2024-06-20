import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from '../../common/interfaces/game.interface';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Get('create')
	public createGame(): Game {
		return this.gamesService.createGame();
	}

	@Get()
	public getAllGames(): Game[] {
		return this.gamesService.getAllGames();
	}

	@Get(':id')
	public getGame(@Param('id') gameID: string): Game {
		const id = parseInt(gameID);

		return this.gamesService.getGameById(id);
	}
}
