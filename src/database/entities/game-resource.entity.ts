import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

import { ResourceType } from '../../common/types/resource.type';

@Entity({ name: 'game-resources' })
export class GameResource {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: ResourceType;

	@Column({ name: 'image_path' })
	imagePath: string;

	@Column({ name: 'is_on_table', default: false })
	isOnTable: boolean;

	@Column({ name: 'is_discard', default: false })
	isDiscard: boolean;

	@Column({ name: 'is_owned', default: false })
	isOwned: boolean;

	@ManyToOne(() => Game, game => game.resources)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@ManyToOne(() => Player, player => player.resources, { nullable: true })
	@JoinColumn({ name: 'player_id' })
	player: Player;

}