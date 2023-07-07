import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { UsersRepository } from './users.repository';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	providers: [UsersRepository],
	imports: [PrismaModule],
	exports: [UsersRepository]
})
export class UsersModule {}
