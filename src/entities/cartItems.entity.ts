import { IBaseEntity } from 'src/common/base.entity.interface';
import { CartItemsSchema } from '@prisma/client';
import { ProductEntity } from './product.entity';
import { createCartItemsEntityType } from './types/create-cartItems.entity';
import { IDisplayPicture } from '../pictures/interfaces/display-picture.interface';
import { IDisplayIngredient } from '../ingredient/interfaces/display-ingredient.interface';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';
import { createProductEntityType } from './types/create-product-entity.type';

export class CartItemsEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _product: ProductEntity;

	constructor({ id, product }: CartItemsSchema & { product: createProductEntityType}) {
		this._id = id;
	
	}

	get id(): number {
		return this._id;
	}

	get products(): ProductEntity {
		return this._product;
	}

	getDisplay(): CartItemsEntity {
		return this;
	}
}
