import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserEntity } from "./entity/user.entity";
import { UserSchema } from '@prisma/client';
import { IDisplayUser } from "./interface/DisplayUser.interface";
import { UsersCreateDto } from "./dtos/users-create.dto";
import { UsersUpdateDto } from "./dtos/users-update.dto";



@Injectable()
export class UserService{
	constructor(private readonly usersRepository:UsersRepository){}

	async getAllUsers():Promise<UserSchema[]>{
		return this.usersRepository.getAllUsers()
	}
	async findUserByEmail(email:string):Promise<IDisplayUser>{
		const userInDB=await this.usersRepository.findUserByEmail(email);
		const UserEn=new UserEntity(userInDB).getDisplayUser();
		return UserEn
	}

	async getFullUserInfo(id:number):Promise<IDisplayUser>{
		const userInDB=await this.usersRepository.getFullUserInfo(id);
		const UserEn=new UserEntity(userInDB).getDisplayUser();
		return UserEn
	}

	async updateUser(dto:UsersUpdateDto):Promise<IDisplayUser>{
		return this.usersRepository.updateUser(dto)

	}
	



}
