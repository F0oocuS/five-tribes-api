import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccessType } from '../../common/enums/game.enums';

import { Player } from './player.entity';
import { GameTile } from './game-tile.entity';
import { GameDjinn } from './game-djinn.entity';
import { GameResource } from './game-resource.entity';
import { User } from './user.entity';

@Entity({ name: 'games' })
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ name: 'access_type', type: 'enum', enum: AccessType, default: AccessType.PUBLIC })
	accessType: AccessType;

	@Column({ name: 'active_player_id' })
	activePlayerId: number;

	@Column({ name: 'max_player_count' })
	maxPlayerCount: number;

	@Column()
	password: string;

	@ManyToOne(() => User, user => user.games)
	@JoinColumn({ name: 'creator_id' })
	user: User;

	@OneToMany(() => Player, player => player.game)
	players: Player[];

	@OneToMany(() => GameTile, gameTile => gameTile.game)
	gameTiles: GameTile[];

	@OneToMany(() => GameResource, gameResource => gameResource.game)
	gameResources: GameResource[];

	@OneToMany(() => GameDjinn, gameDjinn => gameDjinn.game)
	gameDjinns: GameDjinn[];
}