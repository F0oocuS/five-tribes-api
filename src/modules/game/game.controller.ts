import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
// import { Request } from 'express';

import { GameService } from './game.service';

import { Game } from '../../database/entities/game.entity';
import { CreateGameDto } from '../../database/dtos/create-game.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { AccessType } from '../../common/enums/game.enums';

@Controller('games')
export class GameController {
	constructor(private readonly gamesService: GameService) {}

	@Get('')
	public async getAllGames(): Promise<Game[]> {
		return this.gamesService.getAllGames();
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	public async createGame(@Body() createGameDto: CreateGameDto, @Req() request): Promise<Game> {
		// console.log(request.user);
		const user = request.user;

		const tiles = this.gamesService.generateGameTiles();
		const resources = this.gamesService.generateGameResources();
		const djinns = this.gamesService.generateGameDjinns();
		const players = [];

		const game = { ...createGameDto, tiles, resources, djinns, players, creatorId: user.userId };

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
