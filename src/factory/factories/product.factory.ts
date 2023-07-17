import { ProductEntity } from 'src/entities/product.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { ProductSchema } from '@prisma/client';
import { IDisplayProduct } from '../../products/interface/product.display.interface';

export class ProductFactory implements IBaseFactory<ProductEntity> {
	createEntity(schema: ProductSchema): ProductEntity | null {
		if (!schema) return null;
		return new ProductEntity(schema);
	}

	createEntities(schemas: ProductSchema[]): IDisplayProduct[] {
		return schemas.map((schema) => new ProductEntity(schema).getDisplay());
	}
}
