import { Injectable } from '@nestjs/common';
import { ProductSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from '../entities/products.entity';
import { ProductFactory } from '../factory/factories/products.factory';

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
}
