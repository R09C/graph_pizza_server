import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
	controllers: [UsersController],
	providers: [UsersRepository],
	imports: [PrismaModule],
	exports: [UsersRepository]
})
export class UsersModule {}
