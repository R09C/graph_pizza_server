import { ProductSchema } from '@prisma/client';
import { IProductDisplay } from '../products/interface/products.display.interdace';
import { IBaseEntity } from '../common/base.entity.interface';

export class ProductEntity implements IBaseEntity<IProductDisplay> {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _categoryId: number;
	private readonly _ingredients: string[];

	constructor({
		id,
		name,
		categoryId,
		ingredients,
	}: ProductSchema & { ingredients?: { ingredient: { name: string } }[] }) {
		this._id = id;
		this._name = name;
		this._categoryId = categoryId;
		this._ingredients = ingredients?.map((ingredient) => ingredient.ingredient.name);
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get categoryId(): number {
		return this._categoryId;
	}

	get ingredients(): string[] {
		return this._ingredients;
	}

	getDisplay(): IProductDisplay {
		const getDisplay = {
			id: this._id,
			name: this._name,
		};
		return getDisplay;
	}
}
