import { UserSchema, RoleSchema } from '@prisma/client';
import { IDisplayUser } from '../users/interfaces/display-user.interface';
import { IUserWithRoles } from '../users/interfaces/user-with-roles.interface';

export class UserEntity {
	private readonly _id: number;
	private readonly _email: string;
	private readonly _password: string;
	private readonly _roles: string[];

	constructor({ id, email, password, roles }: UserSchema & { roles?: { role: RoleSchema }[] }) {
		this._id = id;
		this._email = email;
		this._password = password;
		this._roles = roles?.map((role) => role.role.value) || [];
	}

	get id(): number {
		return this._id;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get roles(): string[] {
		return this._roles;
	}

	getDisplayUser(): IDisplayUser {
		const user = {
			id: this._id,
			email: this._email,
		};
		console.log(user);
		return user;
	}

	getUserWithRoles(): IUserWithRoles {
		return {
			id: this._id,
			email: this._email,
			roles: this._roles,
		};
	}
}
