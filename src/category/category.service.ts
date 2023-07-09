import { CategoryRepository } from './category.repository';
import { CategorySchema } from '@prisma/client';
import { CategoryCreateDto } from './dto/category-create.dto';
import { IDisplayCategory } from './interfaces/display-category.interface';


export class CategoryService{
	constructor(private readonly categoryRepository: CategoryRepository){}

	async getAllCategories (): Promise<CategorySchema[]> {
		return this.categoryRepository.getAllCategories();
	}

	async getCategoryById (id:number): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.getCategoryById(id);
		if(!category) return null;
		return category.getDisplayCategory();
	}

	async createCategory(dto: CategoryCreateDto):Promise<IDisplayCategory>{
		const category = await this.categoryRepository.createCategory(dto);
		return category.getDisplayCategory();
	}

	async deleteCategory(id:number):Promise<IDisplayCategory>{
		const category = await this.categoryRepository.deleteCategory(id);
		if(!category) return null;
		return category.getDisplayCategory();
		
	}
}