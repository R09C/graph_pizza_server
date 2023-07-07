import { IsString,IsEmail } from "class-validator";import { IsEmail, IsNotEmpty } from 'class-validator';


export class LoginDto {

	@IsEmail()
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;
	
	@IsString()

	@IsNotEmpty()
	readonly password: string;
}