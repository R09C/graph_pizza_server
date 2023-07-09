import { Controller, Get,Param,Put,Body,Post,Delete } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientcreatDto } from './dto/ingredient.creat.dto';


@Controller('Ingredient')
export class IngredientController{
	constructor(private readonly ingredientService:IngredientService) {}

	@Get()
	async getAllIngredient() {
		return this.ingredientService.getAllIngredient();
	}

	@Get(':id')
	async getAllIngredientById(@Param('id') id:string) {
		return this.ingredientService.getAllIngredientById(Number(id));
	}

	@Post()
	async creatIngredient(@Body() dto:IngredientcreatDto) {
		return this.ingredientService.creatIngredient(dto);
	}

	@Delete(':id')
	async deleteIngredient(@Param('id') id:string) {
		return this.ingredientService.deleteIngredient(Number(id));
	}
	

}