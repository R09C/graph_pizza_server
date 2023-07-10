import { Body, Controller, Post,HttpException,HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		try {
			return await this.authService.login(loginDto);
		} catch (error) {
			
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		try {
			return await this.authService.register(registerDto);
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
