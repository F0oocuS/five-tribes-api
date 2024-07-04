import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { UsersController } from './users.controller';

import { User } from '../../database/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService, UsersGateway]
})
export class UsersModule {
}
