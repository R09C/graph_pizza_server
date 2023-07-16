import { ProductEntity } from '../../entities/products.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IBaseSchema } from '../../products/interface/product.baseSchema.interface';
import { IProductDisplay } from '../../products/interface/products.display.interdace';


export class ProductFactory implements IBaseFactory<IProductDisplay, ProductEntity> {
	createEntity(schema: IBaseSchema): ProductEntity | null {
		if (!schema) return null;
		return new ProductEntity(schema);
	}

	createEntities(schemes: IBaseSchema[]): ProductEntity[] {
		const entities = schemes.map((schema) => new ProductEntity(schema));
		return entities;
	}
}
