import { Injectable } from '@nestjs/common';
import { CartItemsRepository } from './cartItems.repository';

@Injectable()
export class CartItemsService {
	constructor(private readonly cartItemsRepository: CartItemsRepository) {}

	async getProductInCart(userId){
		this.cartItemsRepository.getProductInCart(userId);
	};
}
