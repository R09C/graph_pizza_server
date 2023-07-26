import { IsArray, IsNumber } from 'class-validator';
import { IWithPriceIngredient } from '../../ingredient/interfaces/withPrice.ingredient.interface';

export class CreateCartItemDto {
	userId: number;

	@IsNumber()
	productId: number;

	@IsNumber()
	characteristicId: number;

	@IsArray()
	ingredientsToAdd?: number[];
}
