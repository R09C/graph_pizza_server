import { CategoryEntity } from '../../entities/category.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { CategorySchema } from '@prisma/client';

export class CategoryFactory implements IBaseFactory<CategoryEntity> {
	createEntity(schema: CategorySchema): CategoryEntity {
		if (!schema) return null;
		return new CategoryEntity(schema);
	}

	createEntities(schemes: CategorySchema[]): CategoryEntity[] {
		const entities = schemes.map((schema) => new CategoryEntity(schema));
		return entities;
	}
}
