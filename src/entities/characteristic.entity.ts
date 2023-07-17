import { CharacteristicSchema } from '@prisma/client';
import { IBaseEntity } from 'src/common/base.entity.interface';

export class CharacteristicEntity implements IBaseEntity{
	private readonly _id: number;
	private readonly _sizeId: number;
	private readonly _price: number;

	constructor({ id, sizeId, price }: CharacteristicSchema) {
		this._id = id;
		this._sizeId = sizeId;
		this._price = price;
	}

	get id(): number {
		return this._id;
	}

	get sizeId(): number {
		return this._sizeId;
	}

	get price(): number {
		return this._price;
	}

	getDisplay(): CharacteristicEntity {
		return this
	}
}
