import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { IDisplayProduct } from './interface/product.display.interface';
import { ProductEntity } from '../entities/product.entity';
import { ProductUpdateDto } from './dtos/product-update.dto';

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

	async updateProduct(dto: ProductUpdateDto): Promise<ProductEntity> {
		return this.productRepository.updateProduct(dto);
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
		return this.productRepository.deleteProduct(id);
	}

	async getProductsByCategory(category: string): Promise<IDisplayProduct[]> {
		return this.productRepository.getProductsByCategory(category);
	}
}
