import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Game } from './game.entity';
import { GameTile } from './game-tile.entity';
import { GameDjinn } from './game-djinn.entity';
import { GameResource } from './game-resource.entity';

import { PlayerColorEnum } from '../../common/enums/player-color.enum';

@Entity({ name: 'players' })
export class Player {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0 })
	score: number;

	@Column({ default: 50 })
	gold: number;

	@Column({ type: 'enum', enum: PlayerColorEnum, nullable: true })
	color: PlayerColorEnum;

	@Column({ name: 'camel_count', default: 0 })
	camelCount: number;

	@Column({ nullable: true })
	meeples: string;

	@ManyToOne(() => User, user => user.players)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Game, game => game.players)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@OneToMany(() => GameTile, gameTile => gameTile.player)
	tiles: GameTile[];

	@OneToMany(() => GameDjinn, gameDjinn => gameDjinn.player)
	djinns: GameDjinn[];

	@OneToMany(() => GameResource, gameResource => gameResource.player)
	resources: GameResource[];
}