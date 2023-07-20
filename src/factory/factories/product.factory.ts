import { ProductEntity } from 'src/entities/product.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import {
	CategorySchema,
	CharacteristicSchema,
	IngredientSchema,
	PictureSchema,
	ProductSchema,
	SizeSchema,
	UnitSchema,
} from '@prisma/client';
import { IDisplayProduct } from '../../products/interfaces/display-product.interface';
import { createProductEntityType } from '../../entities/types/create-product-entity.type';

export class ProductFactory implements IBaseFactory<ProductEntity> {
	createEntity(schema: createProductEntityType): ProductEntity | null {
		if (!schema) return null;
		return new ProductEntity(schema);
	}

	createEntities(schemas: createProductEntityType[]): IDisplayProduct[] {
		return schemas.map((schema) => new ProductEntity(schema).getDisplay());
	}
}
