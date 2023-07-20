import { PrismaService } from '../prisma/prisma.service';
import { CategorySchema } from '@prisma/client';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { Injectable } from '@nestjs/common';
import { CategoryFactory } from '../factory/factories/category.factory';
import { IDisplayCategory } from './interfaces/display-category.interface';

@Injectable()
export class CategoryRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly categoryFactory: CategoryFactory,
	) {}

	async getAllCategories(): Promise<IDisplayCategory[]> {
		const categories = await this.prismaService.categorySchema.findMany();
		return this.categoryFactory.createEntities(categories);
	}

	async getCategoryByAlias(alias: string): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.findFirst({
			where: {
				alias,
			},
		});
		return this.categoryFactory.createEntity(category);
	}

	async createCategory(data: CategoryCreateDto): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.create({ data });
		return this.categoryFactory.createEntity(category);
	}

	async deleteCategory(id: number): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.delete({
			where: {
				id,
			},
		});
		return this.categoryFactory.createEntity(category);
	}
}
