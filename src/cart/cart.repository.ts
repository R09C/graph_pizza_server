import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { CartItemFactory } from '../factory/factories/cart-item.factory';
import { IDisplayCartItem } from './interfaces/display-cart-item.interface';
import { includeToCartProductsQuery } from '../products/helpers/include-to-cart.products';
import { CartFactory } from '../factory/factories/cart.factory';
import { IDisplayCart } from './interfaces/display-cart.interface';
import { CartEntity } from '../entities/cart.entity';
import { defaultIncludeCharacteristic } from '../characteristic/helpers/default-include.characteristic';

@Injectable()
export class CartRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cartItemFactory: CartItemFactory,
		private readonly cartFactory: CartFactory,
	) {}

	async createCartItem(data: CreateCartItemDto): Promise<CartEntity | null> {
		await this.prismaService.cartItemSchema.create({ data });
		return this.getFullUserCart(data.userId);
	}

	async getFullUserCart(userId: number): Promise<CartEntity | null> {
		const items = await this.prismaService.cartItemSchema.findMany({
			where: { userId },
			include: {
				product: { include: includeToCartProductsQuery },
				characteristic: { include: defaultIncludeCharacteristic },
			},
		});
		return this.cartFactory.createEntity({ userId, items });
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
