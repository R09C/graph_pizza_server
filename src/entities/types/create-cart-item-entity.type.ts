import { IDisplayCharacteristic } from 'src/characteristic/interfaces/display-characteristic.interface';
import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { createProductEntityType } from './create-product-entity.type';
import {
	CharacteristicSchema,
	SizeSchema,
	UnitSchema,
	IngredientSchema,
	IngredientsToAddSchema,
} from '@prisma/client';
import { IWithPriceIngredient } from '../../ingredient/interfaces/withPrice.ingredient.interface';

export type createCartItemEntityType = {
	id: number;
	product: createProductEntityType;
	characteristic: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } };
	ingredientsToAdds: {
		ingredientsToAdd: { price: number; ingredient: { id: number; name: string } };
	}[];
};
