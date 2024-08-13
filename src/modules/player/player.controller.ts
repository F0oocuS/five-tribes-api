import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('players')
export class PlayerController {
	constructor(private readonly playerService: PlayerService) {}
}