import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

	@Post('create')
	public async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
		const tiles = this.gamesService.generateGameTiles();
		const resources = this.gamesService.generateGameResources();
		const djinns = this.gamesService.generateGameDjinns();
		const players = [];

		const game = { ...createGameDto, tiles, resources, djinns, players };

		return this.gamesService.createGame(game);
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
