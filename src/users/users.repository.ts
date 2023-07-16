import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCreateDto } from './dtos/users-create.dto';
import { UserSchema } from '@prisma/client';
import { UsersUpdateDto } from './dtos/users-update.dto';
import { UserEntity } from '../entities/user.entity';
import { UserFactory } from '../factory/factories/user.factory';
import { IDisplayUser } from './interfaces/display-user.interface';

@Injectable()
export class UsersRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userFactory: UserFactory,
	) {}

	async getAllUsers(): Promise<IDisplayUser[]> {
		const users = await this.prismaService.userSchema.findMany({
			include: {
				roles: {
					select: {
						role: true,
					},
				},
			},
		});
		return this.userFactory.createEntities(users);
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.prismaService.userSchema.findFirst({
			where: {
				email,
			},
			include: {
				roles: {
					select: {
						role: true,
					},
				},
			},
		});
		return this.userFactory.createEntity(user);
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		const user = await this.prismaService.userSchema.findFirst({
			where: {
				id,
			},
			include: {
				roles: {
					select: {
						role: true,
					},
				},
			},
		});
		return this.userFactory.createEntity(user);
	}

	async createUser(createUserDto: UsersCreateDto): Promise<UserEntity | null> {
		const user = await this.prismaService.userSchema.create({
			data: {
				...createUserDto,
				roles: {
					create: {
						role: {
							connect: {
								value: 'USER',
							},
						},
					},
				},
			},
		});
		return this.userFactory.createEntity(user);
	}
}
