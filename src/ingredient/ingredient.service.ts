import { IngredientSchema } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientRepository } from './ingredient.repository';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { IngredientEntity } from '../entities/ingredient.entity';
import { IAddIngredientCreateDto } from './dtos/addIngredient-create.dto';
import { IWithPriceIngredient } from './interfaces/withPrice.ingredient.interface';

@Injectable()
export class IngredientService {
	constructor(private readonly ingredientRepository: IngredientRepository) {}

	async getAllIngredients(): Promise<IngredientSchema[]> {
		return this.ingredientRepository.getAllIngredients();
	}

	async getIngredientById(ingredientId: number): Promise<IngredientEntity | null> {
		return this.ingredientRepository.getIngredientById(ingredientId);
	}

	async createIngredient(dto: IngredientCreateDto): Promise<IngredientEntity | null> {
		return this.ingredientRepository.createIngredient(dto);
	}

	async deleteIngredient(id: number): Promise<IngredientEntity | null> {
		return this.ingredientRepository.deleteIngredient(id);
	}

	async createAddIngredient(dto: IAddIngredientCreateDto): Promise<IWithPriceIngredient | null> {
		return this.ingredientRepository.createAddIngredient(dto);
	}

	async getAddIngredients(): Promise<IWithPriceIngredient[]> {
		return this.ingredientRepository.getAddIngredients();
	}
}
