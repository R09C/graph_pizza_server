import { IsNumber } from 'class-validator';

export class CharacteristicCreateDto {
	@IsNumber()
	price: number;
	@IsNumber()
	sizeId: number;
}
