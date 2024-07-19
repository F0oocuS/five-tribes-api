import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../../database/dtos/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async createUser(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		const user = this.userRepository.create({
			...createUserDto,
			password: hashedPassword
		});

		return this.userRepository.save(user);
	}

	public async findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({ where: { email }});
	}

	public async findById(id: number): Promise<User> {
		return this.userRepository.findOne({ where: { id }});
	}
}
