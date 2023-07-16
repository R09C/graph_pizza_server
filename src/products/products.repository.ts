import { Injectable } from '@nestjs/common';
import { ProductSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from '../entities/product.entity';
import { IDisplayProduct } from './interface/products.display.interface';
import { ProductFactory } from '../factory/factories/product.factory';

@Injectable()
export class ProductsRepository {
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
