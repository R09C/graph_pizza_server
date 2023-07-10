import { Controller, Get, Param, Body, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category-create.dto';


@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService:CategoryService) {}

    @Get()
	async getAllCategory () {
		return this.categoryService.getAllCategories();
	}

    @Get(':id')
	async getCategory(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.getCategoryById(id);
	}

    @Post('create')
	async CreateCategory(@Body() dto: CategoryCreateDto) {
		return this.categoryService.createCategory(dto);
	}

    @Delete(':id')
	async UpdateCategory(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.deleteCategory(id);
	}
}
