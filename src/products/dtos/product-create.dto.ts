import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator';

export class ProductCreateDto {
	@IsString()
	name: string;

	@IsNumber()
	categoryId: number;

	@IsNumber()
	@ValidateIf((object, value) => value !== null)
	pictureId?: number;

	@IsArray()
	ingredients: number[];

	@IsArray()
	characteristics: number[];
}
