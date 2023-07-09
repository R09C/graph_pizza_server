import { Controller, Get,Param,Put,Body,Post,Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { СategoryCreateDto } from './dto/category.creat.dto';
import { СategoryUpdateDto } from './dto/category.update.dto';


@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService:CategoryService) {}

    @Get()
	async getAllCategory () {
		return this.categoryService.getAllCateogry();
	}

    @Get(':id')
	async getCategory(@Param('id')id: string) {
		return this.categoryService.getCateogryById(Number(id))
	}

    @Post()
	async CreateCategory(@Body()creatdto:СategoryCreateDto) {
		return this.categoryService.createCateogry(creatdto);
	}

    @Delete(':id')
	async UpdateCategory(@Param('id')id:string) {
		return this.categoryService.deleteCategory(Number(id));
	}
}
