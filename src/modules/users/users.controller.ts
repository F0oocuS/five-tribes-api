import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../../database/dtos/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('')
	public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.createUser(createUserDto);
	}
}
