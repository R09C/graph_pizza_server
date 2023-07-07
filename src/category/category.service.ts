import { CategoryEntity } from "src/entities/category.entity";
import { CategoryRepository } from "./category.repository";
import { CategorySchema } from '@prisma/client';
import { СategoryCreateDto } from "./dto/category.creat.dto";
import { IDisplayCategory } from "./interface/category.display.interface";
import { UserEntity } from "src/entities/user.entity";
import { СategoryUpdateDto } from "./dto/category.update.dto";


export class CategoryService{
	constructor(private readonly categoryRepository: CategoryRepository){}

	async getAllCateogry():Promise<CategorySchema[]>{
		return this.categoryRepository.getAllCateogry()
	}

	async getCateogryById(id:number):Promise<CategoryEntity>|null{
		const categoryInDB= await this.categoryRepository.getCateogryById(id);
		if(!categoryInDB) return null;
		return new CategoryEntity(categoryInDB);
	}

	async createCateogry(dto:СategoryCreateDto):Promise<IDisplayCategory>{
		const craeteCategory=await this.categoryRepository.createCateogry(dto);
		return new CategoryEntity(craeteCategory).getDisplayCategory()
	}

	async updateCategory(dto:СategoryUpdateDto):Promise<IDisplayCategory>{
		const categoryInDB=await this.categoryRepository.updateCategory(dto);
		if(!categoryInDB) return null;
		return new CategoryEntity(categoryInDB).getDisplayCategory()
		
	}
}