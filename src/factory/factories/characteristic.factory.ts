import { CharacteristicEntity } from '../../entities/characteristic.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { CharacteristicSchema, SizeSchema, UnitSchema } from '@prisma/client';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';

export class CharacteristicFactory implements IBaseFactory<CharacteristicEntity> {
	createEntity(
		schema: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } },
	): CharacteristicEntity | null {
		if (!schema) return null;
		return new CharacteristicEntity(schema);
	}

	createEntities(
		schemas: (CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } })[],
	): IDisplayCharacteristic[] {
		return schemas.map((schema) => new CharacteristicEntity(schema).getDisplay());
	}
}
