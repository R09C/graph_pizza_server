import { CategorySchema } from '@prisma/client';
import { IDisplayCategory } from 'src/category/interfaces/display-category.interface';
import { IBaseEntity } from '../common/base.entity.interface';

export class CategoryEntity implements IBaseEntity<IDisplayCategory> {
	private readonly _id: number;
	private readonly _name: string;

	constructor({ id, name }: CategorySchema) {
		this._id = id;
		this._name = name;
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	getDisplay(): IDisplayCategory {
		const getDisplay = {
			id: this._id,
			name: this._name,
		};
		return getDisplay;
	}
}
