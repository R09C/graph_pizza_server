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
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dtos/product-create.dto';


@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	async getAllProducts() {
		try {
			return await this.productsService.getAllProducts();
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getProductsById(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.productsService.getProductsById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createProduct(@Body() dto: ProductCreateDto) {
		try {
			return await this.productsService.createProduct(dto);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async deleteProduct(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.productsService.deleteProduct(id);
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

