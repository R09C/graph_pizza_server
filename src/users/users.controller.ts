import { Controller, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAllUsers() {
		try {
			return this.usersService.getAllUsers();
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		try {
			return this.usersService.getUserById(id);
		} catch (e) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
