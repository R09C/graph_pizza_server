import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Delete,
	ParseIntPipe,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAllCategory() {
		try {
			return await this.categoryService.getAllCategories();
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getCategory(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.categoryService.getCategoryById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createCategory(@Body() dto: CategoryCreateDto) {
		try {
			return await this.categoryService.createCategory(dto);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async deleteCategory(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.categoryService.deleteCategory(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
