import { Injectable } from '@nestjs/common';
import { CartItemsEntity } from '../entities/cartItems.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CartItemsSchema, ProductSchema } from '@prisma/client';
import { defaultIncludeProductsQuery } from '../products/helpers/default-include.products';
// import { CartItemsFactory } from '../factory/factories/cartItems.factory';

@Injectable()
export class CartItemsRepository {
	constructor(
		private readonly prismaService: PrismaService,
		// private readonly cartItemsFactory: CartItemsFactory,
	) {}

	async getProductInCart(userId) {
		const products = await this.prismaService.cartItemsSchema.findMany({
			where: { userId },
			include: {
				user: false,
				product: {
					include: {
						picture: true,
						ingredients: { select: { ingredient: true } },
					},
				},
				characteristic: {
					include: { size: { include: { unit: true } } },
				},
			},
		});
		return products;
	}
}

// export const defaultIncludeProductsQuery = {
// 	picture: true,
// 	ingredients: {
// 		select: {
// 			ingredient: true,
// 		},
// 	},
// 	characteristics: {
// 		include: {
// 			characteristic: {
// 				include: {
// 					size: {
// 						include: { unit: true },
// 					},
// 				},
// 			},
// 		},
// 	},
// };
