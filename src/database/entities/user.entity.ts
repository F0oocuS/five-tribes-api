import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Game } from './game.entity';
import { Player } from './player.entity';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Game, game => game.user)
	games: Game[];

	@OneToMany(() => Player, player => player.user)
	players: Player[];
}