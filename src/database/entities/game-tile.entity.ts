import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

import { TileType } from '../../common/types/tile.type';

import { TileColorEnum } from '../../common/enums/tile-color.enum';

@Entity({ name: 'game-tiles' })
export class GameTile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'enum', enum: TileColorEnum })
	color: TileColorEnum;

	@Column({ name: 'victory_points' })
	victoryPoints: number;

	@Column({ name: 'image_path' })
	imagePath: string;

	@Column()
	type: TileType;

	@Column()
	action: string;

	@Column()
	x: number;

	@Column()
	y: number;

	@Column({ name: 'palaces_count', default: 0 })
	palacesCount: number;

	@Column({ name: 'palma_trees_count', default: 0 })
	palmaTreesCount: number;

	@Column()
	meeples: string;

	@Column({ name: 'is_on_table', default: false })
	isOnTable: boolean;

	@Column({ name: 'is_owned', default: false })
	isOwned: boolean

	@ManyToOne(() => Game, game => game.gameTiles)
	@JoinColumn({ name: 'game_id' })
	game: Game;

	@ManyToOne(() => Player, player => player.gameTiles, { nullable: true })
	@JoinColumn({ name: 'player_id' })
	player: Player;
}