import { IngredientSchema } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IngredientcreatDto } from "./dto/ingredient.creat.dto";
import { IngredientRepository } from "./ingredient.repository";
import { IngredientEntity } from 'src/entities/ingredient.entity';
import { getDisplayIngredient } from './interface/ingredient.entity.enterface';

@Injectable()
export class IngredientService{
	constructor(private readonly ingredientRepository:IngredientRepository){}

	async getAllIngredient():Promise<IngredientSchema[]>{
		return this.ingredientRepository.getAllIngredient();
	}

	async getAllIngredientById(ingredientId:number):Promise<IngredientEntity>{
		const ingredientInDB= await this.ingredientRepository.getAllIngredientById(ingredientId);
		return new IngredientEntity(ingredientInDB);
		
	}

	async creatIngredient(dto:IngredientcreatDto):Promise<getDisplayIngredient>{
		const creatIngredient= await this.ingredientRepository.creatIngredient(dto);	
		return new IngredientEntity(creatIngredient).getDisplayIngredient();
	}

	async deleteIngredient(id:number):Promise<IngredientSchema>{
		const deleteIngredient= await this.ingredientRepository.deleteIngredient(id);
		if(!deleteIngredient) null;
		return new IngredientEntity(deleteIngredient);
	}
}