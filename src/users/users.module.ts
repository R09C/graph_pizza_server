import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [PrismaModule, FactoryModule],
	exports: [UsersService],
})
export class UsersModule {}
