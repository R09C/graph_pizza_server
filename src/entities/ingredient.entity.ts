import { IngredientSchema } from '@prisma/client';
import { getDisplayIngredient } from 'src/ingredient/interface/ingredient.entity.enterface';

export class IngredientEntity{
	private readonly _id:number;
	private readonly _name:string;
	private readonly _products:string[];

	constructor({ id,name }:IngredientSchema){
		this._id=id;
		this._name=name;
	}

	get id():number{
		return this._id;
	}

	get name():string{
		return this._name;
	}

	getDisplayIngredient():getDisplayIngredient{
		return {
			id: this._id,
			name: this._name
		};
	}
}