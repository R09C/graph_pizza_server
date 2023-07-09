import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';


@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository],
	imports: [PrismaModule],
	exports: [CategoryService]
})
export class CategoryModule {}