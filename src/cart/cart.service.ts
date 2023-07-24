import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';

@Injectable()
export class CartService {
	constructor(private readonly cartRepository: CartRepository) {}

	async createCartItem(data: CreateCartItemDto) {
		return this.cartRepository.createCartItem(data);
	}
}
