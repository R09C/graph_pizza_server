import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Delete,
	ParseIntPipe,
	HttpException,
	HttpStatus,
	Put,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { CartItemsService } from './cartItems.service';

@Controller('cart')
export class CartItemsController {
	constructor(private readonly cartItemsService: CartItemsService) {}
	@Get()
	async getProductInCart() {
		try {
			return await this.cartItemsService.getProductInCart(1);
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
