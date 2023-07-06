import {UserSchema, } from "@prisma/client";

export class UserEntity {
	private readonly id: number;
	private readonly email: string;
	private readonly password: string;

	constructor({id, email, password}: UserSchema ) {
		this.id = id;
		this.email = email;
		this.password = password;
	}
}