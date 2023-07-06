import {UserSchema,RoleSchema} from '@prisma/client'
import { IDisplayUser } from '../interface/DisplayUser.interface';
import { UsersCreateDto } from '../dtos/users-create.dto';

export class UserEntity{
	private readonly id:number;
	private email:string;
	private readonly roles:string[];
	private readonly password:string;

	constructor({id,email,password,roles}:UserSchema & { roles?: RoleSchema[]}){
	this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles?.map(role=> role.value)||[];
	}

	getDisplayUser():IDisplayUser{
		return {
			id:this.id,
			email:this.email,
		}
	}

}