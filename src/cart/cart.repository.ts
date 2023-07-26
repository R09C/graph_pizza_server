import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { CartItemFactory } from '../factory/factories/cart-item.factory';
import { IDisplayCartItem } from './interfaces/display-cart-item.interface';
import { includeToCartProductsQuery } from '../products/helpers/include-to-cart.products';
import { CartFactory } from '../factory/factories/cart.factory';
import { IDisplayCart } from './interfaces/display-cart.interface';
import { CartEntity } from '../entities/cart.entity';
import { defaultIncludeCharacteristicQuery } from '../characteristic/helpers/default-include-characteristic.query';

@Injectable()
export class CartRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cartItemFactory: CartItemFactory,
		private readonly cartFactory: CartFactory,
	) {}

	async createCartItem({
		ingredientsToAdd,
		...data
	}: CreateCartItemDto): Promise<CartEntity | null> {
		await this.prismaService.cartItemSchema.create({
			data: {
				...data,
				ingredientsToAdd: {
					create: ingredientsToAdd.map((ingredientId) => ({
						ingredientId,
					})),
				},
			},
		});
		return this.getFullUserCart(data.userId);
	}

	async deleteCart(userId: number): Promise<CartEntity | null> {
		await this.prismaService.cartItemSchema.deleteMany({ where: { userId } });
		return this.getFullUserCart(userId);
	}

	async deleteCartItem(userId: number, productId: number): Promise<CartEntity | null> {
		await this.prismaService.cartItemSchema.deleteMany({
			where: { AND: [{ userId }, { productId }] },
		});
		return this.getFullUserCart(userId);
	}

	async getFullUserCart(userId: number): Promise<CartEntity | null> {
		const items = await this.prismaService.cartItemSchema.findMany({
			where: { userId },
			include: {
				product: { include: includeToCartProductsQuery },
				characteristic: { include: defaultIncludeCharacteristicQuery },
				ingredientsToAdd: {
					include: {
						ingredient: {
							include: {
								ingredient: true,
							},
						},
					},
				},
			},
		});
		return this.cartFactory.createEntity({ userId, items });
	}
}
