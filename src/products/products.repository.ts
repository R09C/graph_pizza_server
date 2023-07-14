import { Injectable } from '@nestjs/common';
import { ProductSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from '../entities/products.entity';
import { NewProduct } from './interface/products.interface';

@Injectable()
export class ProductsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllProducts(): Promise<ProductEntity[]> {
		const getProducts = await this.prismaService.productSchema.findMany({
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

		const products = getProducts.map((product) => {
			let fullName = '';
			product.ingredients.forEach((ingredient) => {
				fullName = fullName + ', ' + ingredient.ingredient.name;
			});
			delete product.ingredients;
			const ingredients: NewProduct = {
				...product,
				ingredients: fullName,
			};
			return ingredients;
		});

		const productsEntity = products.map((product) => new ProductEntity(product));

		return productsEntity;
	}

	async getProductsById(id: number): Promise<ProductEntity> {
		const getProduct = await this.prismaService.productSchema.findFirst({
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

		let fullName = '';
		getProduct.ingredients.forEach((ingredient) => {
			fullName = fullName + ', ' + ingredient.ingredient.name;
		});
		delete getProduct.ingredients;
		const ingredients: NewProduct = {
			...getProduct,
			ingredients: fullName,
		};

		return new ProductEntity(ingredients);
	}
}
