import { IngredientSchema } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientRepository } from './ingredient.repository';
import { IngredientEntity } from 'src/entities/ingredient.entity';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';

@Injectable()
export class IngredientService{
	constructor(private readonly ingredientRepository:IngredientRepository) {}

	async getAllIngredients(): Promise<IngredientSchema[]> {
		return this.ingredientRepository.getAllIngredients();
	}

	async getIngredientById (ingredientId:number): Promise<IngredientEntity | null> {
		const ingredient = await this.ingredientRepository.getIngredientById(ingredientId);
		if(!ingredient) throw new NotFoundException(NOT_FOUND_ERROR);
		return ingredient.getDisplayIngredient();
	}

	async createIngredient(dto:IngredientCreateDto): Promise<IngredientEntity | null> {
		const ingredient = await this.ingredientRepository.createIngredient(dto);
		if(!ingredient) throw new BadRequestException(CREATE_ERROR);
		return ingredient.getDisplayIngredient();
	}

	async deleteIngredient(id:number): Promise<IngredientEntity | null> {
		const ingredient = await this.ingredientRepository.deleteIngredient(id);
		if(!ingredient) throw new BadRequestException(DELETE_ERROR);
		return ingredient.getDisplayIngredient();
	}
}