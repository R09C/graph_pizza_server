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
import { ProductService } from './product.service';
import { ProductCreateDto } from './dtos/product-create.dto';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAllProducts() {
		try {
			return await this.productService.getAllProducts();
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getProductById(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.productService.getProductById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createProduct(@Body() dto: ProductCreateDto) {
		try {
			return await this.productService.createProduct(dto);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async deleteProduct(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.productService.deleteProduct(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
