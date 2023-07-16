import { IngredientEntity } from '../../entities/ingredient.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IngredientSchema } from '@prisma/client';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';

export class IngredientFactory implements IBaseFactory<IDisplayIngredient,IngredientEntity> {
	createEntity(schema: IngredientSchema): IngredientEntity {
		if (!schema) return null;
		return new IngredientEntity(schema);
	}

	createEntities(schemes: IngredientSchema[]): IngredientEntity[] {
		const entities = schemes.map((schema) => new IngredientEntity(schema));
		return entities;
	}
}
