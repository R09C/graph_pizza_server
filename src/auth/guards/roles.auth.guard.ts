import {
	Injectable,
	CanActivate,
	ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {JwtService} from "@nestjs/jwt";
import {ROLES_KEY} from "../../role/role.decorator";

@Injectable()
export class RolesAuthGuard implements CanActivate {
	constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if(!requiredRoles) {
			return true;
		}
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			console.log(bearer)
			if(bearer!= 'Bearer' || !token){
				return false;
			}
			const user = await this.jwtService.verifyAsync(token);
			req.user = user;
			return user.roles.some((role) => requiredRoles.includes(role.value));
		} catch (e) {
			return false;
		}
	}
}