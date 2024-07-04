import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UserModule } from '../user/user.module';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'jwt_secret',
			signOptions: { expiresIn: '2d' }
		}),
		UserModule
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {
}
