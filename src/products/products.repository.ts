import { Injectable } from '@nestjs/common';
import { ProductSchema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductEntity } from '../entities/products.entity';
import { ProductFactory } from '../factory/factories/products.factory';
import { ProductCreateDto } from './dtos/product-create.dto';

@Injectable()
export class ProductsRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productFactory: ProductFactory,
	) {}

	async getAllProducts(): Promise<ProductEntity[]> {
		const products = await this.prismaService.productSchema.findMany({
			include: {
				ingredients: {
					select: {
						ingredient: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		return this.productFactory.createEntities(products);
	}

	async getProductsById(id: number): Promise<ProductEntity> {
		const product = await this.prismaService.productSchema.findFirst({
			where: {
				id,
			},
			include: {
				ingredients: {
					select: {
						ingredient: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
		return this.productFactory.createEntity(product);
	}

	async createProduct({
		categoryId,
		ingredients,
		...data
	}: ProductCreateDto): Promise<ProductEntity> {
		const product = await this.prismaService.productSchema.create({
			data: {
				...data,
				category: {
					connect: {
						id: categoryId,
					},
				},
				ingredients: {
					create: ingredients,
				},
			},
			include: {
				ingredients: {
					select: {
						ingredient: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
		console.log(product);
		return this.productFactory.createEntity(product);
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
		const product = await this.prismaService.productSchema.delete({
			where: {
				id,
			},
			include: {
				ingredients: {
					select: {
						ingredient: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
		return this.productFactory.createEntity(product);
	}
}
