import { IsNumber, IsString } from 'class-validator';

export class SizeCreateDto {
	@IsString()
	value: string;

	@IsNumber()
	unitId: number;
}
