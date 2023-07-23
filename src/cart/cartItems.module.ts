import { Module } from '@nestjs/common';
import { CartItemsController } from './cartItems.controller';
import { CartItemsService } from './cartItems.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';
import { CartItemsRepository } from './cartItems.repository';

@Module({
	controllers: [CartItemsController],
	providers: [CartItemsService,CartItemsRepository],
	imports: [PrismaModule, FactoryModule],
})
export class CartModule {}
