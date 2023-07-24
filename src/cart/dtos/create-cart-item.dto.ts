import { IsNumber } from 'class-validator';

export class CreateCartItemDto {
	userId: number;

	@IsNumber()
	productId: number;

	@IsNumber()
	characteristicId: number;
}
