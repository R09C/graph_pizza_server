import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { IDisplayProduct } from './interface/products.display.interface';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	async getAllProducts(): Promise<IDisplayProduct[]> {
		return this.productsRepository.getAllProducts();
	}

	async getProductsById(id: number): Promise<ProductEntity> {
		return this.productsRepository.getProductsById(id);
	}
}
