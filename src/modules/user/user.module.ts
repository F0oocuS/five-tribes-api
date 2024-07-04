import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserGateway } from './user.gateway';

import { User } from '../../database/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, UserGateway],
	exports: [UserService]
})
export class UserModule {
}
