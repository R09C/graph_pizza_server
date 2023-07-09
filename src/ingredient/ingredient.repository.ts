import { PrismaService } from "src/prisma/prisma.service";
import { IngredientSchema } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IngredientcreatDto } from "./dto/ingredient.creat.dto";

@Injectable()
export class IngredientRepository{
	constructor(private readonly prismaService:PrismaService){}

	async getAllIngredient():Promise<IngredientSchema[]>{
		return this.prismaService.ingredientSchema.findMany({
			select:{
				id:true,
				name:true,
			}
		});
	}
	

	async getAllIngredientById(ingredientId):Promise<IngredientSchema>{
		return this.prismaService.ingredientSchema.findFirst({
			where:{
				id:ingredientId
			},
			include:{
				products:{
					select:{
						product:{
							select:{
								name:true
							}
						}
					}
				}
			}
		});
	}

	async creatIngredient({...dto}:IngredientcreatDto):Promise<IngredientSchema>{
		return this.prismaService.ingredientSchema.create({
			data:{
				...dto
			},
			include:{
				products:{
					select:{
						product:{
							select:{
								name:true
							}
						}
					}
				}
			}
		});
	}

	async deleteIngredient(id:number):Promise<IngredientSchema>{
		return this.prismaService.ingredientSchema.delete({
			where:{
				id
			},
			
		});
	}
}