import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { UpdatePizzaDto } from './dtos/update-pizza.dto';

@Controller('pizza')
export class PizzaController {
	constructor(private readonly pizzaService: PizzaService) { }

    @Get()
	async getAll (@Query('limit', ParseIntPipe) limit, @Query('page', ParseIntPipe) page) {
		const skip = limit*page - limit;
		return this.pizzaService.getAllPizzas(limit, skip);
	}

	@Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
    	return this.pizzaService.getPizzaById(id);
    }

	@Post('create')
	async createPizza(@Body() createPizzaDto: CreatePizzaDto) {
		return this.pizzaService.createPizza(createPizzaDto);
	}

	@Put('update')
	async updatePizza(@Body() updatePizzaDto: UpdatePizzaDto) {
		return this.pizzaService.updatePizza(updatePizzaDto);
	}
}
