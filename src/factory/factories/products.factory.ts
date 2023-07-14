import { ProductEntity } from 'src/entities/products.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IBaseSchema } from '../../products/interface/product.baseSchema.interface';


export class ProductFactory implements IBaseFactory<ProductEntity> {
	createEntity(schema: IBaseSchema): ProductEntity | null {
		if (!schema) return null;
		return new ProductEntity(schema);
	}

	createEntities(schemes: IBaseSchema[]): ProductEntity[] {
		const entities = schemes.map((schema) => new ProductEntity(schema));
		return entities;
	}
}
