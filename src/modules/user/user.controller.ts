import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../../database/dtos/create-user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('')
	public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto);
	}
}
