import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { UpdatePizzaDto } from './dtos/update-pizza.dto';

@Injectable()
export class PizzaService {
	constructor(private readonly prismaService: PrismaService) { }


	async createPizza (dto: CreatePizzaDto) {
		return this.prismaService.pizzaSchema.create({ data: dto });
	}

	async updatePizza ({ id, name }: UpdatePizzaDto ) {
		return this.prismaService.pizzaSchema.update({ where: { id }, data:{ name } });
	}

	async getAllPizzas (take: number, skip: number) {
		return this.prismaService.pizzaSchema.findMany({ take, skip });
	}

	async getPizzaById (id: number) {
		return this.prismaService.pizzaSchema.findFirst({ where: { id } });
	}

}
