import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { IDisplayProduct } from './interface/product.display.interface';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async getAllProducts(): Promise<IDisplayProduct[]> {
		return this.productRepository.getAllProducts();
	}

	async getProductById(id: number): Promise<ProductEntity> {
		return this.productRepository.getProductById(id);
	}

	async createProduct(dto: ProductCreateDto): Promise<ProductEntity> {
		return this.productRepository.createProduct(dto);
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
		return this.productRepository.deleteProduct(id);
	}
}
