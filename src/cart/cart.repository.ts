import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { CartItemFactory } from '../factory/factories/cart-item.factory';
import { defaultIncludeProductsQuery } from '../products/helpers/default-include.products';
import { IDisplayCartItem } from './interfaces/display-cart-item.interface';
import { includeToCartProductsQuery } from '../products/helpers/include-to-cart.products';

@Injectable()
export class CartRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cartItemFactory: CartItemFactory,
	) {}

	async createCartItem(data: CreateCartItemDto): Promise<IDisplayCartItem | null> {
		const cartItem = await this.prismaService.cartItemSchema.create({
			data,
			include: {
				user: true,
				product: {
					include: includeToCartProductsQuery,
				},
				characteristic: {
					include: { size: { include: { unit: true } } },
				},
			},
		});
		return this.cartItemFactory.createEntity(cartItem);
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
