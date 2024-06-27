import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Game } from '../../database/entities/game.entity';
import { GameTile } from '../../database/entities/game-tile.entity';
import { CreateGameDto } from '../../database/dtos/create-game.dto';

import { TilesStub } from '../../common/stubs/core/tiles.stub';

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game)
		private readonly gameRepository: Repository<Game>,
		@InjectRepository(GameTile)
		private readonly gameTileRepository: Repository<GameTile>

	) {}

	public async createGame(createGameDto: CreateGameDto): Promise<Game> {
		const { gameTiles } = createGameDto;

		const game = this.gameRepository.create(createGameDto);
		const savedGame = await this.gameRepository.save(game);

		if (gameTiles && gameTiles.length > 0) {
			const tiles = gameTiles.map(tile => ({ ...tile, game: savedGame }));

			await this.gameTileRepository.save(tiles);
		}

		return savedGame;
	}

	public generateGameTiles() {
		const tiles = TilesStub;
		const result = [];

		let x = 0;
		let y = 0;

		tiles.forEach(item => {
			const { color, victoryPoints, imagePath, type, action } = item;

			for(let i = 0; i < item.countInDeck; i++) {
				result.push({ color, victoryPoints, imagePath, type, action, x, y })

				if (x < 5) {
					x++;
				} else {
					x = 0;
					y++;
				}
			}
		});

		return result;
	}








	// private games: Game[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Game with id: ' + 1,
	// 		tiles: [],
	// 		players: [],
	// 		currentPlayer: null,
	// 		djinns: [],
	// 		activeDjinns: [],
	// 		resources: [],
	// 		activeResources: [],
	// 		creatorID: 1,
	// 		accessType: 'public'
	// 	}
	// ];
	// private gameID: number = 2;
	//
	// public createGame(): Game {
	// 	const newGame: Game = {
	// 		id: this.gameID,
	// 		title: 'Game with id: ' + this.gameID,
	// 		tiles: [],
	// 		players: [],
	// 		currentPlayer: null,
	// 		djinns: [],
	// 		activeDjinns: [],
	// 		resources: [],
	// 		activeResources: [],
	// 		creatorID: 1,
	// 		accessType: 'public'
	// 	}
	//
	// 	this.games.push(newGame);
	// 	this.gameID++;
	//
	// 	return newGame;
	// }
	//
	// public getGameById(gameID: number): Game {
	// 	return this.games.find(game => game.id === gameID);
	// }
	//
	// public getAllGames(): Game[] {
	// 	return [...this.games];
	// }
}
