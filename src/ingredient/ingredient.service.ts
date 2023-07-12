import { IngredientSchema } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientRepository } from './ingredient.repository';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { IDisplayCategory } from 'src/category/interfaces/display-category.interface';

@Injectable()
export class IngredientService {
	constructor(private readonly ingredientRepository: IngredientRepository) {}

	async getAllIngredients(): Promise<IngredientSchema[]> {
		return this.ingredientRepository.getAllIngredients();
	}

	async getIngredientById(ingredientId: number): Promise<IDisplayCategory | null> {
		const ingredient = await this.ingredientRepository.getIngredientById(ingredientId);
		if (!ingredient) throw new NotFoundException(NOT_FOUND_ERROR);
		return ingredient.getDisplayIngredient();
	}

	async createIngredient(dto: IngredientCreateDto): Promise<IDisplayCategory | null> {
		const ingredient = await this.ingredientRepository.createIngredient(dto);
		if (!ingredient) throw new BadRequestException(CREATE_ERROR);
		return ingredient.getDisplayIngredient();
	}

	async deleteIngredient(id: number): Promise<IDisplayCategory | null> {
		const ingredient = await this.ingredientRepository.deleteIngredient(id);
		if (!ingredient) throw new BadRequestException(DELETE_ERROR);
		return ingredient.getDisplayIngredient();
	}
}
