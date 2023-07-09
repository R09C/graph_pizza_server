import { PrismaService } from "src/prisma/prisma.service";
import { CategorySchema } from '@prisma/client';
import { СategoryCreateDto } from "./dto/category.creat.dto";
import { СategoryUpdateDto } from "./dto/category.update.dto";
export class CategoryRepository{
	constructor(private readonly prismaService:PrismaService ){}

	async getAllCateogry():Promise<CategorySchema[]>{
		return this.prismaService.categorySchema.findMany({
			select:{
				id:true,
				name:true,
				product:true
			}
		});
	}
	
	async getCateogryById(id:number):Promise<CategorySchema>|null{
		return this.prismaService.categorySchema.findFirst({
			where:{
				id
			},
			select:{
				id:true,
				name:true,
				product:true
			}
		});
	}

	async createCateogry(dto:СategoryCreateDto):Promise<CategorySchema>{
		return this.prismaService.categorySchema.create({
			data:{
				...dto
			}
		});
	}

	async deleteCategory(id:number):Promise<CategorySchema>{
		return this.prismaService.categorySchema.delete({
			where:{
				id
			},
		})
	}
}
