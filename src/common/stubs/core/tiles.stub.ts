import { Tile } from '../../interfaces/tile.interface';
import { TileColorEnum } from '../../enums/tile-color.enum';

export const TilesStub: Tile[] = [
	{
		color: TileColorEnum.RED,
		victoryPoints: 6,
		imagePath: '',
		type: 'small-market',
		action: '',
		countInDeck: 8
	},
	{
		color: TileColorEnum.RED,
		victoryPoints: 4,
		imagePath: '',
		type: 'large-market',
		action: '',
		countInDeck: 4
	},
	{
		color: TileColorEnum.RED,
		victoryPoints: 8,
		imagePath: '',
		type: 'oasis',
		action: '',
		countInDeck: 6
	},
	{
		color: TileColorEnum.BLUE,
		victoryPoints: 5,
		imagePath: '',
		type: 'village',
		action: '',
		countInDeck: 5
	},
	{
		color: TileColorEnum.BLUE,
		victoryPoints: 6,
		imagePath: '',
		type: 'sacred-place',
		action: '',
		countInDeck: 4
	},
	{
		color: TileColorEnum.BLUE,
		victoryPoints: 10,
		imagePath: '',
		type: 'sacred-place',
		action: '',
		countInDeck: 1
	},
	{
		color: TileColorEnum.BLUE,
		victoryPoints: 12,
		imagePath: '',
		type: 'sacred-place',
		action: '',
		countInDeck: 1
	},
	{
		color: TileColorEnum.BLUE,
		victoryPoints: 15,
		imagePath: '',
		type: 'sacred-place',
		action: '',
		countInDeck: 1
	}
];