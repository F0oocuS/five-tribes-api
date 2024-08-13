import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccessType } from '../../common/enums/game.enums';

import { User } from './user.entity';
import { Player } from './player.entity';
import { GameTile } from './game-tile.entity';
import { GameDjinn } from './game-djinn.entity';
import { GameResource } from './game-resource.entity';

@Entity({ name: 'games' })
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ name: 'access_type', type: 'enum', enum: AccessType, default: AccessType.PUBLIC })
	accessType: AccessType;

	@Column({ name: 'active_player_id', nullable: true })
	activePlayerId: number;

	@Column({ name: 'max_player_count', default: 4 })
	maxPlayerCount: number;

	@Column({ nullable: true })
	password: string;

	@ManyToOne(() => User, user => user.games, { nullable: false })
	@JoinColumn({ name: 'creator_id' })
	user: User;

	@OneToMany(() => Player, player => player.game)
	players: Player[];

	@OneToMany(() => GameTile, gameTile => gameTile.game)
	tiles: GameTile[];

	@OneToMany(() => GameResource, gameResource => gameResource.game)
	resources: GameResource[];

	@OneToMany(() => GameDjinn, gameDjinn => gameDjinn.game)
	djinns: GameDjinn[];
}