import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './users.repository';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [PrismaModule],
	exports: [UsersService]
})
export class UsersModule {}
