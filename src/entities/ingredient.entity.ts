import { IngredientSchema } from '@prisma/client';
import { IDisplayIngredient } from 'src/ingredient/interfaces/display-ingredient.interface';
import { IBaseEntity } from '../common/base.entity.interface';

export class IngredientEntity implements IBaseEntity<IDisplayIngredient> {
	private readonly _id: number;
	private readonly _name: string;

	constructor({ id, name }: IngredientSchema) {
		this._id = id;
		this._name = name;
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	getDisplay(): IDisplayIngredient {
		const getDisplay = {
			id: this._id,
			name: this._name,
		};
		return getDisplay;
	}
}
