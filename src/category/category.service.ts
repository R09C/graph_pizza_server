import { CategoryRepository } from './category.repository';
import { CategorySchema } from '@prisma/client';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { IDisplayCategory } from './interfaces/display-category.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';

export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async getAllCategories(): Promise<CategorySchema[]> {
		return this.categoryRepository.getAllCategories();
	}

	async getCategoryById(id: number): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.getCategoryById(id);
		if (!category) throw new NotFoundException(NOT_FOUND_ERROR);
		return category.getDisplayCategory();
	}

	async createCategory(dto: CategoryCreateDto): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.createCategory(dto);
		if (!category) throw new BadRequestException(CREATE_ERROR);
		return category.getDisplayCategory();
	}

	async deleteCategory(id: number): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.deleteCategory(id);
		if (!category) throw new BadRequestException(DELETE_ERROR);
		return category.getDisplayCategory();
	}
}
