import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

@Entity({ name: 'game-tiles' })
export class GameTile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	color: string;

	@Column({ name: 'victory_points' })
	victoryPoints: number;

	@Column({ name: 'image_path' })
	imagePath: string;

	@Column()
	type: string;

	@Column()
	action: string;

	@Column()
	x: number;

	@Column()
	y: number;

	@Column({ name: 'palaces_count' })
	palacesCount: number;

	@Column({ name: 'palma_trees_count' })
	palmaTreesCount: number;

	@Column()
	meeples: string;

	@Column({ name: 'is_on_table', nullable: true })
	isOnTable: boolean;

	@Column({ name: 'is_owned', nullable: true })
	isOwned: boolean

	@ManyToOne(() => Game, game => game.gameTiles)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@ManyToOne(() => Player, player => player.gameTiles, { nullable: true })
	@JoinColumn({ name: 'player_id' })
	player: Player;
}