import {
	Controller,
	Get,
	Put,
	Param,
	Body,
	Post,
	Delete,
	ParseIntPipe,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { IAddIngredientCreateDto } from './dtos/addIngredient-create.dto';

@Controller('ingredients')
export class IngredientController {
	constructor(private readonly ingredientService: IngredientService) {}

	@Get()
	async getAllIngredient() {
		try {
			return await this.ingredientService.getAllIngredients();
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getAllIngredientById(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.ingredientService.getIngredientById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createIngredient(@Body() dto: IngredientCreateDto) {
		try {
			return await this.ingredientService.createIngredient(dto);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async deleteIngredient(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.ingredientService.deleteIngredient(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create/add')
	async createAddIngredient(@Body() dto: IAddIngredientCreateDto) {
		try {
			return await this.ingredientService.createAddIngredient(dto);
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('add')
	async getAddIngredients() {
		try {
			return await this.ingredientService.getAddIngredients();
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
