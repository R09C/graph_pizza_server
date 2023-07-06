import {Controller, Get} from '@nestjs/common';
import {UsersRepository} from "./users.repository";

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersRepository) {
	}
    @Get()
	async getUsers () {
		return this.usersService.getAllUsers()
	}
}
