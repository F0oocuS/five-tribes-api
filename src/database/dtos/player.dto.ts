import { Expose, Transform } from 'class-transformer';

export class PlayerDto {
	@Expose()
	id: number;

	@Expose()
	score: number;

	@Expose()
	gold: number;

	@Expose()
	color: string;

	@Expose()
	camelCount: number;

	@Expose()
	meeples: string;

	@Expose()
	@Transform(({ obj }) => obj.user.id)
	userId: number;
}