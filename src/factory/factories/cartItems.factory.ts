import { CartItemsEntity } from 'src/entities/cartItems.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import {
	CartItemsSchema,
	CharacteristicSchema,
	IngredientSchema,
	PictureSchema,
	SizeSchema,
	UnitSchema,
} from '@prisma/client';
import { createCartItemsEntityType } from '../../entities/types/create-cartItems.entity';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { ProductEntity } from '../../entities/product.entity';

// export class CartItemsFactory implements IBaseFactory<CartItemsEntity> {
// 	createEntity(schema: createCartItemsEntityType): CartItemsEntity {
// 		if (!schema) return null;
// 		return new CartItemsEntity(schema);
// 	}
// 	createEntities(schemas: createCartItemsEntityType[]): CartItemsEntity[] {

// 		return schemas.map((newSchema) => new CartItemsEntity());
// 	}
// }
