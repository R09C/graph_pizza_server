import { ProductSchema } from '@prisma/client';
import { IDisplayProduct } from '../products/interface/product.display.interface';

export class ProductEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _categoryId: number;
	private readonly _ingredients: string[];
	private readonly _size: number[];
	private readonly _price: number[];

	constructor({
		id,
		name,
		categoryId,
		ingredients,
		characteristics,
	}: ProductSchema & {
		ingredients?: { ingredient: { name: string } }[];
		characteristics?: { characteristic: { size: number; price: number } }[];
	}) {
		this._id = id;
		this._name = name;
		this._categoryId = categoryId;
		this._ingredients = ingredients?.map((ingredient) => ingredient.ingredient.name);
		[this._size, this._price] = characteristics?.map((characteristic) => [
			characteristic.characteristic.size,
			characteristic.characteristic.price,
		]);
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

	get size(): number[] {
		return this._size;
	}

	get price(): number[] {
		return this._price;
	}

	getDisplay(): IDisplayProduct {
		return {
			id: this._id,
			name: this._name,
		};
	}
}
