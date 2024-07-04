import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../../database/dtos/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto);

		return await this.userRepository.save(user);
	}
}
