import { PrismaService } from 'src/prisma/prisma.service';
import { CategorySchema } from '@prisma/client';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryCreateDto } from './dtos/category-create.dto';

export class CategoryRepository{
	constructor(private readonly prismaService:PrismaService ){}

	async getAllCategories (): Promise<CategorySchema[]> {
		return this.prismaService.categorySchema.findMany({
			select:{
				id:true,
				name:true,
			}
		});
	}
	
	async getCategoryById (id:number): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.findFirst({
			where: {
				id
			}
		});
		if(!category) return null;
		return new CategoryEntity(category);
	}

	async createCategory (data: CategoryCreateDto): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.create({ data });
		if(!category) return null;
		return new CategoryEntity(category);
	}

	async deleteCategory (id: number): Promise<CategoryEntity | null> {
		const category = await this.prismaService.categorySchema.delete({
			where:{
				id
			},
		});
		if(!category) return null;
		return new CategoryEntity(category);
	}
}
