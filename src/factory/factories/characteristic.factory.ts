import { CharacteristicEntity } from '../../entities/characteristic.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { CharacteristicSchema } from '@prisma/client';

export class CharacteristicFactory implements IBaseFactory<CharacteristicEntity> {
	createEntity(schema: CharacteristicSchema): CharacteristicEntity | null {
		if (!schema) return null;
		return new CharacteristicEntity(schema);
	}

	createEntities(schemas: CharacteristicSchema[]): CharacteristicEntity[] {
		return schemas.map((schema) => new CharacteristicEntity(schema).getDisplay());
	}
}
