import { User } from './user.interface';

export interface Game {
	id: number;
	title: string;
	tiles: any[];
	players: any[];
	currentPlayer: any;
	djinns: any[];
	activeDjinns: any[];
	resources: any[];
	activeResources: any[];
	creatorID: number;
}
