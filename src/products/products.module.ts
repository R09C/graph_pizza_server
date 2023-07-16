import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository],
	imports: [PrismaModule, FactoryModule],
	exports: [ProductsService],
})
export class ProductsModule {}
