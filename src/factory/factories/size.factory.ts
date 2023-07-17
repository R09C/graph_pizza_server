import { SizeEntity } from '../../entities/size.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { SizeSchema } from '@prisma/client';

export class SizeFactory implements IBaseFactory<SizeEntity> {
	createEntity(schema: SizeSchema): SizeEntity | null {
		if (!schema) return null;
		return new SizeEntity(schema);
	}

	createEntities(schemas: SizeSchema[]): SizeEntity[] {
		return schemas.map((schema) => new SizeEntity(schema).getDisplay());
	}
}
