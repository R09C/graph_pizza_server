import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCreateDto } from './dtos/users-create.dto';
import { UserSchema } from '@prisma/client';
import { UsersUpdateDto } from './dtos/users-update.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllUsers():Promise<Omit<UserSchema, 'password'>[]> {
        return this.prismaService.userSchema.findMany({
            select: {
                id: true,
                email: true,
                roles:true
            }
        });
    }

    async getUserByEmail(email: string): Promise<UserSchema | null> {
        return await this.prismaService.userSchema.findFirst({
            where: {
                email
            },
            include: {
                roles: {
                    select: {
                        role: true
                    }
                }
            }

        });
    }

    async getUserById(id: number): Promise<UserSchema | null>{
        return this.prismaService.userSchema.findFirst({
            where: {
                id
            },
            include: {
                roles: {
                    select: {
                        role: true
                    }
                }
            }
        });
    }

    async createUser(createUserDto: UsersCreateDto): Promise<UserSchema> {
        return this.prismaService.userSchema.create({
            data:{
                ...createUserDto,
                roles:{
                    create:{
                        role:{
                            connect:{
                                value: 'USER'
                            }
                        }
                    }
                }
            }
        });
    }

    async updateUser({ id, ...data }: UsersUpdateDto):Promise<UserSchema> {
        return this.prismaService.userSchema.update({
            where:{
                id
            },
            data:{
                ...data,
            }
        });
    }

}


