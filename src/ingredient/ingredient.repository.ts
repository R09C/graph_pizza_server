import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientSchema } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientEntity } from '../entities/ingredient.entity';

@Injectable()
export class IngredientRepository{
	constructor(private readonly prismaService:PrismaService){}

	async getAllIngredients(): Promise<IngredientSchema[]> {
		return this.prismaService.ingredientSchema.findMany();
	}


	async getIngredientById(id: number): Promise<IngredientEntity | null> {
		const ingredient = await this.prismaService.ingredientSchema.findFirst({
			where:{ id },
		});
		if(!ingredient) return null;
		return new IngredientEntity(ingredient);
	}

	async createIngredient(data: IngredientCreateDto):Promise<IngredientEntity | null>{
		const ingredient = await this.prismaService.ingredientSchema.create({ data });
		if(!ingredient) return null;
		return new IngredientEntity(ingredient);
	}

	async deleteIngredient(id:number):Promise<IngredientEntity | null>{
		const ingredient = await this.prismaService.ingredientSchema.delete({ where:{ id } });
		if(!ingredient) return null;
		return new IngredientEntity(ingredient);
	}
}