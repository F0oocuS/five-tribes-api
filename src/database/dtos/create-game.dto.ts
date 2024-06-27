import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

import { TileType } from '../../common/types/tile.type';
import { ResourceType } from '../../common/types/resource.type';
import { AccessType } from '../../common/enums/game.enums';
import { TileColorEnum } from '../../common/enums/tile-color.enum';
import { Type } from 'class-transformer';

class CreateGameTileDto {
	@IsString()
	@IsNotEmpty()
	color: TileColorEnum;

	@IsNumber()
	@IsNotEmpty()
	victoryPoints: number;

	@IsString()
	@IsNotEmpty()
	imagePath: string;

	@IsString()
	@IsNotEmpty()
	type: TileType;

	@IsString()
	@IsNotEmpty()
	action: string;

	@IsNumber()
	x: number;

	@IsNumber()
	y: number;

	@IsNumber()
	palacesCount: number;

	@IsNumber()
	palmaTreesCount: number;

	@IsString()
	@IsNotEmpty()
	meeples: string;
}

/*class CreateGameResourceDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	type: ResourceType;

	@IsString()
	@IsNotEmpty()
	imagePath: string;
}*/

export class CreateGameDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	accessType: AccessType;

	@IsNumber()
	@Min(2)
	@Max(4)
	maxPlayerCount: number;

	@IsString()
	password?: string;

	@IsNumber()
	creatorId: number;

	@ValidateNested({ each: true })
	@Type(() => CreateGameTileDto)
	@ArrayMinSize(0)
	@IsOptional()
	gameTiles?: CreateGameTileDto[];
}