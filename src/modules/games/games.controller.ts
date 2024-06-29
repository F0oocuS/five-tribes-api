import { Controller, Get, Param } from '@nestjs/common';

import { Game } from '../../database/entities/game.entity';
import { GamesService } from './games.service';
import { CreateGameDto } from '../../database/dtos/create-game.dto';

import { AccessType } from '../../common/enums/game.enums';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Get('')
	public async getAllGames(): Promise<Game[]> {
		return this.gamesService.getAllGames();
	}

	@Get('create')
	public async createGame(): Promise<Game> {
		const tiles = this.gamesService.generateGameTiles();
		const resources = this.gamesService.generateGameResources();
		const djinns = this.gamesService.generateGameDjinns();

		const createGameDto: CreateGameDto = {
			title: 'First game',
			accessType: AccessType.PUBLIC,
			maxPlayerCount: 4,
			creatorId: 1,
			gameTiles: [...tiles],
			gameResources: [...resources],
			gameDjinns: [...djinns]
		}

		return this.gamesService.createGame(createGameDto);
	}

	@Get('tiles')
	public getTiles() {
		return this.gamesService.generateGameTiles();
	}

	@Get('resources')
	public getResources() {
		return this.gamesService.generateGameResources();
	}

	@Get('djinns')
	public getDjinns() {
		return this.gamesService.generateGameDjinns();
	}

	@Get(':id')
	async getGameById(@Param('id') id: number): Promise<Game> {
		return this.gamesService.getGameById(id);
	}
}
