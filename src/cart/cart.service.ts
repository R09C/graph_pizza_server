import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { CharacteristicService } from '../characteristic/characteristic.service';
import { CartEntity } from '../entities/cart.entity';

@Injectable()
export class CartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly characteristicService: CharacteristicService,
	) {}

	async createCartItem(data: CreateCartItemDto): Promise<CartEntity | null> {
		const checked = await this.characteristicService.checkProductToCharacteristic(
			data.productId,
			data.characteristicId,
		);
		if (!checked) return null;
		return this.cartRepository.createCartItem(data);
	}
}
