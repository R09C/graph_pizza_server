import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from '../entities/products.entity';
import { ProductCreateDto } from './dtos/product-create.dto';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	async getAllProducts(): Promise<ProductEntity[]> {
		return this.productsRepository.getAllProducts();
	}

	async getProductsById(id: number): Promise<ProductEntity> {
		return this.productsRepository.getProductsById(id);
	}

	async createProduct(dto: ProductCreateDto): Promise<ProductEntity> {
		return this.productsRepository.createProduct(dto);
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
		return this.productsRepository.deleteProduct(id);
	}
}
