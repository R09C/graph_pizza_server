import { IsNotEmpty, IsNumber } from 'class-validator';


export class UpdatePizzaDto {
	@IsNumber()
	id: number;

	@IsNotEmpty()
	name: string;
}