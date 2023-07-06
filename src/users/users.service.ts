import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCreateDto } from './dtos/users-create.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllUsers() {
		return this.prismaService.userSchema.findMany({ select: { id: true, email: true } });
	}

	async findUserByEmail(email: string, needRoles = true) {
		return this.prismaService.userSchema.findFirst({ where: { email }, select: { id: true, email: true, roles: needRoles } });
	}

	async getFullUserInfo(email: string) {
		return this.prismaService.userSchema.findFirst({ where: { email }, include: { roles: { select: { role: true } } } });
	}

	async createUser(dto: UsersCreateDto) {
		return this.prismaService.userSchema.create({ data: { ...dto, roles: { create: { role: { connect:{ value: 'USER' } } } } }, select: { id: true, email: true } });
	}
}
