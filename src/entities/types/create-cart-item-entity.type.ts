import { IDisplayCharacteristic } from 'src/characteristic/interfaces/display-characteristic.interface';
import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { createProductEntityType } from './create-product-entity.type';
import { CharacteristicSchema, SizeSchema, UnitSchema } from '@prisma/client';

export type createCartItemEntityType = {
	id: number;
	product: createProductEntityType;
	characteristic: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } };
};
