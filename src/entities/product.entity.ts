import {
	CharacteristicSchema,
	IngredientSchema,
	ProductSchema,
	SizeSchema,
	UnitSchema,
} from '@prisma/client';
import { IDisplayProduct } from '../products/interface/product.display.interface';
import { IDisplayIngredient } from '../ingredient/interfaces/display-ingredient.interface';
import { IngredientEntity } from './ingredient.entity';
import { CharacteristicEntity } from './characteristic.entity';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';

export class ProductEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _categoryId: number;
	private readonly _ingredients: IDisplayIngredient[];
	private readonly _characteristics: IDisplayCharacteristic[];

	constructor({
		id,
		name,
		categoryId,
		ingredients,
		characteristics,
	}: ProductSchema & {
		ingredients?: { ingredient: IngredientSchema }[];
		characteristics?: {
			characteristic: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } };
		}[];
	}) {
		this._id = id;
		this._name = name;
		this._categoryId = categoryId;
		this._ingredients = ingredients?.map((ingredient) =>
			new IngredientEntity(ingredient.ingredient).getDisplay(),
		);
		this._characteristics = characteristics?.map((ch) =>
			new CharacteristicEntity(ch.characteristic).getDisplay(),
		);
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get ingredients(): IDisplayIngredient[] {
		return this._ingredients;
	}

	getDisplay(): IDisplayProduct {
		return {
			id: this._id,
			name: this._name,
			ingredients: this._ingredients,
			characteristics: this._characteristics,
		};
	}
}
