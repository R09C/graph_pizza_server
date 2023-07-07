import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersRepository) {
	}
    @Get()
	async getUsers () {
		return this.usersService.getAllUsers();
	}
}
