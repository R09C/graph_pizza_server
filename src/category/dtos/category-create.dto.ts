import { IsString } from 'class-validator';

export class CategoryCreateDto {
	@IsString()
	name: string;

	@IsString()
	alias: string;
}
