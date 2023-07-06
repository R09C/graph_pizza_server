import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {CreateRoleDto} from "./dtos/create-role.dto";
import {RoleService} from "./role.service";
import {Roles} from "./role.decorator";
import {RolesAuthGuard} from "../auth/guards/roles.auth.guard";

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {
	}

	@Roles("ADMIN")
	@UseGuards(RolesAuthGuard)
    @Post('create')
	createRole (@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}
}
