import { IsArray, IsNumber, IsString } from 'class-validator';

export class ProductUpdateDto {
	@IsNumber()
	id: number;

	@IsString()
	name: string;

	@IsNumber()
	categoryId: number;

	@IsArray()
	ingredients: number[];

	@IsArray()
	characteristics: number[];
}
