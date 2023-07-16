import { CategoryEntity } from '../../entities/category.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { CategorySchema } from '@prisma/client';
import { IDisplayCategory } from '../../category/interfaces/display-category.interface';

export class CategoryFactory implements IBaseFactory<IDisplayCategory, CategoryEntity> {
	createEntity(schema: CategorySchema): CategoryEntity {
		if (!schema) return null;
		return new CategoryEntity(schema);
	}

	createEntities(schemes: CategorySchema[]): IDisplayCategory[] {
		return schemes.map((schema) => new CategoryEntity(schema).getDisplay());
	}
}
