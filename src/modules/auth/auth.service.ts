import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../../database/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async validatePassword(password: string, hashedPassword: string) {
		return bcrypt.compare(password, hashedPassword);
	}

	async login(user: User) {
		const payload = { username: user.name, sub: user.id };

		return { access_token: this.jwtService.sign(payload), userId: user.id }
	}
}
