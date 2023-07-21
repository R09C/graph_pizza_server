import {
	CartItemsSchema,
	IngredientSchema,
	CharacteristicSchema,
	ProductSchema,
	SizeSchema,
	UnitSchema,
} from '@prisma/client';
import { createProductEntityType } from './create-product-entity.type';
import { IDisplayCharacteristic } from 'src/characteristic/interfaces/display-characteristic.interface';
import { IDisplayIngredient } from 'src/ingredient/interfaces/display-ingredient.interface';
import { IDisplayPicture } from 'src/pictures/interfaces/display-picture.interface';

export type createCartItemsEntityType ={
	id: number;
	products: {
		product: { id: number; name: string; categoryId: number };
		picture: IDisplayPicture;
		pictureId:number;
		ingredients: {
			ingredient: IngredientSchema;
		}[];
		characteristics: {
			characteristic: CharacteristicSchema & {
				size: SizeSchema & {
					unit: UnitSchema;
				};
			};
		}[];
	}[];
}