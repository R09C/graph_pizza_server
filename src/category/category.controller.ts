import { Controller, Get,Param,Put,Body,Post } from '@nestjs/common';
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

    @Get()
	async getCategory(@Param('id')id: string) {
		return this.categoryService.getCateogryById(Number(id))
	}

    @Post()
	async CreateCategory(@Body()creatdto:СategoryCreateDto) {
		return this.categoryService.createCateogry(creatdto);
	}

    @Put()
	async UpdateCategory(@Body()updatedto:СategoryUpdateDto) {
		return this.categoryService.updateCategory(updatedto);
	}
}
