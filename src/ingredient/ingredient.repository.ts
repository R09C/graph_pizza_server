import { PrismaService } from '../prisma/prisma.service';
import { IngredientSchema } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientEntity } from '../entities/ingredient.entity';
import { IngredientFactory } from '../factory/factories/ingredient.factory';

@Injectable()
export class IngredientRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly ingredientFactory: IngredientFactory,
	) {}

	async getAllIngredients(): Promise<IngredientSchema[]> {
		const ingredients = await this.prismaService.ingredientSchema.findMany();
		return this.ingredientFactory.createEntities(ingredients);
	}

	async getIngredientById(id: number): Promise<IngredientEntity | null> {
		const ingredient = await this.prismaService.ingredientSchema.findFirst({
			where: { id },
		});
		return this.ingredientFactory.createEntity(ingredient);
	}

	async createIngredient(data: IngredientCreateDto): Promise<IngredientEntity | null> {
		const ingredient = await this.prismaService.ingredientSchema.create({ data });
		return this.ingredientFactory.createEntity(ingredient);
	}

	async deleteIngredient(id: number): Promise<IngredientEntity | null> {
		const ingredient = await this.prismaService.ingredientSchema.delete({ where: { id } });
		return this.ingredientFactory.createEntity(ingredient);
	}
}
