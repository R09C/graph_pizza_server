import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateRoleDto} from "./dtos/create-role.dto";
import {AddRoleDto} from "./dtos/add-role.dto";

@Injectable()
export class RoleService {
	constructor(private readonly prismaService: PrismaService) {}

	async createRole({value}: CreateRoleDto) {
		return this.prismaService.roleSchema.create({data: {value}});
	}

	async addRoleToUser(addRoleDto: AddRoleDto) {
		return this.prismaService.userOnRolesSchema.create({data: addRoleDto});
	}
}
