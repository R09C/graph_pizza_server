import { IsString } from 'class-validator';

export class IngredientCreateDto {
	@IsString()
	name: string;
}
