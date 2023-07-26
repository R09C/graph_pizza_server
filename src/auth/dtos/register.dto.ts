import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	@Length(5, 24)
	readonly password: string;
}
