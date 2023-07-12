import { Injectable } from '@nestjs/common';
import { UsersCreateDto } from './dtos/users-create.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from '../entities/user.entity';
import { IDisplayUser } from './interfaces/display-user.interface';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async getAllUsers() {
		return await this.usersRepository.getAllUsers();
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.usersRepository.getUserByEmail(email);
		if (!user) return null;
		return new UserEntity(user);
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		const user = await this.usersRepository.getUserById(id);
		if (!user) return null;
		return new UserEntity(user);
	}

	async createUser(dto: UsersCreateDto): Promise<IDisplayUser> {
		const user = await this.usersRepository.createUser(dto);
		return new UserEntity(user).getDisplayUser();
	}
}
