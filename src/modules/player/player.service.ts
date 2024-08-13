import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../../database/entities/player.entity';
import { Game } from '../../database/entities/game.entity';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class PlayerService {
	constructor(
		@InjectRepository(Player)
		private readonly playerRepository: Repository<Player>,
		@InjectRepository(Game)
		private readonly gameRepository: Repository<Game>
	) {}

	public async addPlayerToGame(gameId: number, user: User): Promise<Player> {
		const game = await this.gameRepository.findOne({ where: { id: gameId } });

		if (!game) {
			throw new Error('Game was not found!');
		}

		const player = this.playerRepository.create({
			game,
			user,
		});

		return this.playerRepository.save(player);
	}
}