import { TileType } from '../types/tile.type';
import { TileColorEnum } from '../enums/tile-color.enum';

export interface Tile {
	color: TileColorEnum;
	victoryPoints: number;
	imagePath: string;
	type: TileType;
	action: string;
	countInDeck: number;
}