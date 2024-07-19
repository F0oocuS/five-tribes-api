import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: 'jwt_secret',
			signOptions: { expiresIn: '2d' }
		})
	],
	providers: [AuthService, JwtStrategy, JwtAuthGuard],
	controllers: [AuthController]
})
export class AuthModule {
}
