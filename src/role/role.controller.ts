import {Body, Controller, Post} from '@nestjs/common';
import {CreateRoleDto} from "./dtos/create-role.dto";
import {RoleService} from "./role.service";

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {
	}

    @Post('create')
	createRole (@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}
}
