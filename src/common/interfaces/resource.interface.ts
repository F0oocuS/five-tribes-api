import { ResourceType } from '../types/resource.type';

export interface Resource {
	name: string;
	type: ResourceType;
	imagePath: '',
	countInDeck: number;
}