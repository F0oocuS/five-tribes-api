import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

@Entity({ name: 'game-djinns' })
export class GameDjinn {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ name: 'victory_points' })
	victoryPoints: number;

	@Column( { name: 'image_path' })
	imagePath: string;

	@Column()
	effect: string;

	@Column({ nullable: true })
	price: string;

	@Column({ name: 'is_on_table', nullable: true })
	isOnTable: boolean;

	@Column({ name: 'is_discard', nullable: true })
	isDiscard: boolean;

	@Column({ name: 'is_owned', nullable: true })
	isOwned: boolean;

	@ManyToOne(() => Game, game => game.djinns)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@ManyToOne(() => Player, player => player.djinns, { nullable: true })
	@JoinColumn({ name: 'player_id' })
	player: Player;
}