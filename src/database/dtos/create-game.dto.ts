import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TileType } from '../../common/types/tile.type';
import { ResourceType } from '../../common/types/resource.type';

import { AccessType } from '../../common/enums/game.enums';
import { TileColorEnum } from '../../common/enums/tile-color.enum';
import { Player } from '../entities/player.entity';

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
	meeples?: string;
}

class CreateGameResourceDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	type: ResourceType;

	@IsString()
	@IsNotEmpty()
	imagePath: string;
}

class CreateGameDjinnDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	victoryPoints: number;

	@IsString()
	@IsNotEmpty()
	imagePath: string;

	@IsString()
	@IsNotEmpty()
	effect: string;

	@IsString()
	@IsOptional()
	price?: string;
}

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
	tiles?: CreateGameTileDto[];

	@ValidateNested({ each: true })
	@Type(() => CreateGameResourceDto)
	@ArrayMinSize(0)
	@IsOptional()
	resources?: CreateGameResourceDto[];

	@ValidateNested({ each: true })
	@Type(() => CreateGameDjinnDto)
	@ArrayMinSize(0)
	@IsOptional()
	djinns?: CreateGameDjinnDto[];

	@ValidateNested({ each: true })
	players?: Player[];
}