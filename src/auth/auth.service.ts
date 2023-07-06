import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from "./dtos/login.dto";
import {UsersService} from "../users/users.repository";
import {JwtService} from "@nestjs/jwt";
import {ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR} from "./auth.constants";
import {RegisterDto} from "./dtos/register.dto";
import {compare, genSalt, hash} from "bcryptjs";
import {JwtPayloadDto} from "./dtos/jwt-payload.dto";


@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async login ({email, password}: LoginDto) {
		const existedUser = await this.usersService.getFullUserInfo(email);
		if(!existedUser) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		const comparedPasswords = await compare(password, existedUser.password);
		if(!comparedPasswords) throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		return this.generateToken({id: existedUser.id, email: existedUser.email, roles: existedUser.roles.map((role => role.role.value))});
	}

	async register (registerDto: RegisterDto) {
		const existedUser = await this.usersService.findUserByEmail(registerDto.email);
		if(existedUser) throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);
		const salt = await genSalt(10);
		const hashPassword = await hash(registerDto.password, salt);
		return await this.usersService.createUser({...registerDto, password: hashPassword});
	}

	private async generateToken(payload: JwtPayloadDto) {
		return this.jwtService.signAsync(payload);
	}

}
