import { IsString,IsNumber } from 'class-validator';

export class IAddIngredientCreateDto {
	@IsNumber()
	ingredientId: number;

	@IsNumber()
	price: number;
}
