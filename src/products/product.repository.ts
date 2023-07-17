import { Injectable } from '@nestjs/common';
import { ProductSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from '../entities/product.entity';
import { IDisplayProduct } from './interface/product.display.interface';
import { ProductFactory } from '../factory/factories/product.factory';
import { ProductCreateDto } from './dtos/product-create.dto';

@Injectable()
export class ProductRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productFactory: ProductFactory,
	) {}

	async getAllProducts(): Promise<IDisplayProduct[]> {
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
				characteristics: {
					select: {
						characteristic: {
							select: {
								size: true,
								price: true,
							},
						},
					},
				},
			},
		});

		return this.productFactory.createEntities(products);
	}

	async getProductById(id: number): Promise<ProductEntity> {
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
				characteristics: {
					select: {
						characteristic: {
							select: {
								size: true,
								price: true,
							},
						},
					},
				},
			},
		});

		return this.productFactory.createEntity(product);
	}

	async createProduct({
		ingredients,
		categoryId,
		characteristics,
		...dto
	}: ProductCreateDto): Promise<ProductEntity> {
		const product = await this.prismaService.productSchema.create({
			data: {
				...dto,
				category: {
					connect: {
						id: categoryId,
					},
				},
				ingredients: {
					create: ingredients,
				},
				characteristics: {
					create: characteristics,
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
				characteristics: {
					select: {
						characteristic: {
							select: {
								size: true,
								price: true,
							},
						},
					},
				},
			},
		});

		return this.productFactory.createEntity(product);
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
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
				characteristics: {
					select: {
						characteristic: {
							select: {
								size: true,
								price: true,
							},
						},
					},
				},
			},
		});

		return this.productFactory.createEntity(product);
	}
}
