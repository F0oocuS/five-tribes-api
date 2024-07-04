import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserGateway } from './user.gateway';
import { UserController } from './user.controller';

import { User } from '../../database/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, UserGateway]
})
export class UserModule {
}