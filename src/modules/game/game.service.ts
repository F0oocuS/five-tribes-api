import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../database/entities/user.entity';
import { Game } from '../../database/entities/game.entity';
import { GameTile } from '../../database/entities/game-tile.entity';
import { GameResource } from '../../database/entities/game-resource.entity';
import { GameDjinn } from '../../database/entities/game-djinn.entity';
import { Player } from '../../database/entities/player.entity';
import { CreateGameDto } from '../../database/dtos/create-game.dto';

import { TilesStub } from '../../common/stubs/core/tiles.stub';
import { ResourcesStub } from '../../common/stubs/core/resources.stub';
import { DjinnsStub } from '../../common/stubs/core/djinns.stub';
import { MeeplesStub } from '../../common/stubs/core/meeples.stub';
import { plainToInstance } from 'class-transformer';
import { PlayerDto } from '../../database/dtos/player.dto';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game)
		private readonly gameRepository: Repository<Game>,
		@InjectRepository(GameTile)
		private readonly gameTileRepository: Repository<GameTile>,
		@InjectRepository(GameResource)
		private readonly gameResourceRepository: Repository<GameResource>,
		@InjectRepository(GameDjinn)
		private readonly gameDjinnRepository: Repository<GameDjinn>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Player)
		private readonly playerRepository: Repository<Player>,
		private readonly gameGateway: GameGateway
	) {}

	public async createGame(createGameDto: CreateGameDto, user: User): Promise<Game> {
		const { tiles, resources, djinns, ...gameData } = createGameDto;

		const game = this.gameRepository.create({ ...gameData, user });
		const savedGame = await this.gameRepository.save(game);

		if (tiles && tiles.length) {
			const gameTiles = tiles.map(tile => ({ ...tile, game: savedGame }));

			await this.gameTileRepository.save(gameTiles);
		}

		if (resources && resources.length) {
			const gameResources = resources.map(tile => ({ ...tile, game: savedGame }));

			await this.gameResourceRepository.save(gameResources);
		}

		if (djinns && djinns.length) {
			const gameDjinns = djinns.map(djinn => ({ ...djinn, game: savedGame }));

			await this.gameDjinnRepository.save(gameDjinns);
		}

		return savedGame;
	}

	public async getGameById(id: number): Promise<Game> {
		const game = await this.gameRepository.findOne({
			where: { id },
			relations: ['tiles', 'resources', 'djinns', 'players', 'players.user']
		});

		if (!game) {
			throw new NotFoundException(`Game with id ${id} not found!`);
		}

		return game;
	}

	public async getAllGames(): Promise<Game[]> {
		const games = await this.gameRepository.find();

		if (!games) {
			return [];
		}

		return games;
	}

	public async addPlayerToGame(gameId: number, user: User): Promise<Game> {
		const game = await this.gameRepository.findOne({
			where: { id: gameId },
			relations: ['players', 'players.user']
		});

		if (!game) {
			throw new Error('Game not found');
		}

		game.players.forEach(player => {
			if (player.user.id === user.id) {
				throw new Error('You already join in the game');
			}
		});

		const player = this.playerRepository.create({ game, user });

		await this.playerRepository.save(player);

		this.gameGateway.notifyPlayers(gameId);

		// game.players = [...game.players, player];
		// TODO гвард має перевіряти доступність гравця
		// TODO think about remove additional database request and return expanded object instead
		return this.gameRepository.findOne({
			where: { id: gameId },
			relations: ['players', 'players.user']
		});

		// return game;
	}

	public generateGameTiles() {
		const result = [];
		const meeples = this.shuffleArray([...MeeplesStub]);

		let x = 0;
		let y = 0;

		[...TilesStub].forEach(tile => {
			const { color, victoryPoints, imagePath, type, action, countInDeck } = tile;

			for(let i = 0; i < countInDeck; i++) {
				const lastThreeMeeples = meeples.splice(-3);

				result.push({ color, victoryPoints, imagePath, type, action, meeples: lastThreeMeeples.join('') })
			}
		});

		this.shuffleArray(result);

		result.forEach(item => {
			item.x = x;
			item.y = y;

			if (x < 5) {
				x++;
			} else {
				x = 0;
				y++;
			}
		});

		return result;
	}

	public generateGameResources() {
		const result = [];

		[...ResourcesStub].forEach(resource => {
			const { name, type, imagePath, countInDeck } = resource;

			for (let i = 0; i < countInDeck; i++) {
				result.push({ name, type, imagePath });
			}
		});

		return this.shuffleArray(result);
	}

	public generateGameDjinns() {
		return this.shuffleArray([...DjinnsStub]);
	}

	public shuffleArray(array: any[]): any[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}
}
