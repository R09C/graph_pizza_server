import { IsNotEmpty } from 'class-validator';


export class CreatePizzaDto {

	@IsNotEmpty()
	name: string;
	
}