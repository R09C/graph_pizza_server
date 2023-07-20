import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator';

export class ProductUpdateDto {
	@IsNumber()
	id: number;

	@IsString()
	name: string;

	@IsNumber()
	@ValidateIf((object, value) => value !== null)
	pictureId?: number;

	@IsNumber()
	categoryId: number;

	@IsArray()
	ingredients: number[];

	@IsArray()
	characteristics: number[];
}
