import {SizeSchema} from '@prisma/client';
import { IBaseEntity } from 'src/common/base.entity.interface';

export class SizeEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _value: string;
	private readonly _unitId: number;

	constructor({ id, value, unitId}: SizeSchema) {
		this._id = id;
		this._value = value;
		this._unitId = unitId;
	}

	get id(): number {
		return this._id;
	}

	get value(): string {
		return this._value;
	}

	get unitId(): number {
		return this._unitId;
	}

	getDisplay(): SizeEntity {
		return this;
	}
}