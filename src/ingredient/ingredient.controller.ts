import { Controller, Get, Param, Body, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientcreatDto } from './dto/ingredient.creat.dto';


@Controller('ingredients')
export class IngredientController{
	constructor(private readonly ingredientService:IngredientService) {}

	@Get()
	async getAllIngredient() {
		return this.ingredientService.getAllIngredients();
	}

	@Get(':id')
	async getAllIngredientById( @Param('id', ParseIntPipe) id:number ) {
		return this.ingredientService.getIngredientById(id);
	}

	@Post('create')
	async creatIngredient( @Body() dto:IngredientcreatDto ) {
		return this.ingredientService.createIngredient(dto);
	}

	@Delete(':id')
	async deleteIngredient( @Param('id', ParseIntPipe) id:number ) {
		return await this.ingredientService.deleteIngredient(id);
	}
	

}