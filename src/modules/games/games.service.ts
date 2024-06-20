import { Injectable } from '@nestjs/common';
import { Game } from '../../common/interfaces/game.interface';

@Injectable()
export class GamesService {
	private games: Game[] = [
		{
			id: 1,
			title: 'Game with id: ' + 1,
			tiles: [],
			players: [],
			currentPlayer: null,
			djinns: [],
			activeDjinns: [],
			resources: [],
			activeResources: [],
			creatorID: 1
		}
	];
	private gameID: number = 2;

	public createGame(): Game {
		const newGame: Game = {
			id: this.gameID,
			title: 'Game with id: ' + this.gameID,
			tiles: [],
			players: [],
			currentPlayer: null,
			djinns: [],
			activeDjinns: [],
			resources: [],
			activeResources: [],
			creatorID: 1
		}

		this.games.push(newGame);
		this.gameID++;

		return newGame;
	}

	public getGameById(gameID: number): Game {
		return this.games.find(game => game.id === gameID);
	}

	public getAllGames(): Game[] {
		return [...this.games];
	}
}
