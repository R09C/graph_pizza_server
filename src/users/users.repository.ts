import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UsersCreateDto} from "./dtos/users-create.dto";
import { UserSchema } from '@prisma/client';
import { UsersUpdateDto } from './dtos/users-update.dto';

@Injectable()
export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllUsers():Promise<UserSchema[]> {
		return this.prismaService.userSchema.findMany({
			select: {
				id: true,
				email: true,
				password:true,
				roles:true
			}
		});
	}

	async findUserByEmail(email: string):Promise<UserSchema>|null{
		return this.prismaService.userSchema.findFirst({
			where: {
				email
			},
			 select: {
				id: true,
				email: true,
				password:true,
				roles:true
			},
			
			});
	}

	async getFullUserInfo(id: number):Promise<UserSchema>{
		return this.prismaService.userSchema.findFirst({
			where: {
				id
			},
			 select: {
				id: true,
				email: true,
				password:true,
				roles:true
			},
			
			});
	}

	async createUser({email,password,role}: UsersCreateDto):Promise<Omit<UserSchema,'password'>> {
		return this.prismaService.userSchema.create({
			data:{
				email,
				password,
				roles:{
					create:{
						role:{
							connect:{
								value:role
							}
						}
					}
				}
				},
				select: {
					id: true,
					email: true
				}
		});
	}

	async updateUser({id,email}: UsersUpdateDto):Promise<UserSchema> {
		return this.prismaService.userSchema.update({
			where:{
				id
			},
			data:{
				email,
			}
		});
	}

}
