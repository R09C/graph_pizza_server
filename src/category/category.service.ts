import { CategoryRepository } from './category.repository';
import { CategorySchema } from '@prisma/client';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async getAllCategories(): Promise<CategorySchema[]> {
		return this.categoryRepository.getAllCategories();
	}

	async getCategoryByAlias(alias: string): Promise<CategoryEntity> {
		return this.categoryRepository.getCategoryByAlias(alias);
	}

	async createCategory(dto: CategoryCreateDto): Promise<CategoryEntity | null> {
		return this.categoryRepository.createCategory(dto);
	}

	async deleteCategory(id: number): Promise<CategoryEntity> {
		return this.categoryRepository.deleteCategory(id);
	}
}
