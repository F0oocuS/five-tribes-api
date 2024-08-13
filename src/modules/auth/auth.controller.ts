import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../database/dtos/create-user.dto';
import { LoginDto } from '../../database/dtos/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

	@Post('sign-up')
	public async signUp(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
	}

	@Post('sign-in')
	public async signIn(@Body() loginDto: LoginDto) {
		const user = await this.userService.findByEmail(loginDto.email);

		console.log(user);

		if (!user || !(await this.authService.validatePassword(loginDto.password, user.password))) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return this.authService.login(user);
	}
}
