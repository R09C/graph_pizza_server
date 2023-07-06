import { Module } from '@nestjs/common';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	controllers: [PizzaController],
	providers: [PizzaService],
	imports: [PrismaModule]
})
export class PizzaModule {}
