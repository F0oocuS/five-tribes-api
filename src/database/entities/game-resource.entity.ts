import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

@Entity({ name: 'game_resources' })
export class GameResource {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: string;

	@Column({ name: 'image_path' })
	imagePath: string;

	@Column({ name: 'is_on_table', nullable: true })
	isOnTable: boolean;

	@Column({ name: 'is_discard', nullable: true })
	isDiscard: boolean;

	@Column({ name: 'is_owned', nullable: true })
	isOwned: boolean;

	@ManyToOne(() => Game, game => game.gameResources)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@ManyToOne(() => Player, player => player.gameResources, { nullable: true })
	@JoinColumn({ name: 'player_id' })
	player: Player;

}