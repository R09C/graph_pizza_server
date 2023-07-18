import { IsArray, IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
	@IsString()
	name: string;

	@IsNumber()
	categoryId: number;

	@IsArray()
	ingredients: number[];

	@IsArray()
	characteristics: number[];
}
