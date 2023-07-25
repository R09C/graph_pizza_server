import { IngredientEntity } from '../../entities/ingredient.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IngredientSchema, IngredientsToAddSchema } from '@prisma/client';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';
import { IWithPriceIngredient } from '../../ingredient/interfaces/withPrice.ingredient.interface';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export class IngredientFactory implements IBaseFactory<IngredientEntity> {
	createEntity(schema: IngredientSchema & { price?: number }): IngredientEntity {
		if (!schema) return null;
		return new IngredientEntity(schema);
	}

	createEntities(schemas: IngredientSchema[]): IDisplayIngredient[] {
		return schemas.map((schema) => new IngredientEntity(schema).getDisplay());
	}

	createEntitiesWithPrice(
		schemas: (IngredientsToAddSchema & { ingredient: { id: number; name: string } })[],
	): IWithPriceIngredient[] {
		return schemas.map((schema) =>
			new IngredientEntity({
				id: schema.ingredient.id,
				name: schema.ingredient.name,
				price: schema.price,
			}).getWithPrice(),
		);
	}
}
