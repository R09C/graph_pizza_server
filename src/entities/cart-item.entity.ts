import { IBaseEntity } from 'src/common/base.entity.interface';
import { createCartItemEntityType } from './types/create-cart-item-entity.type';
import { IProductToCart } from '../products/interfaces/product-to-cart.interface';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';
import { IDisplayCartItem } from '../cart/interfaces/display-cart-item.interface';
import { ProductEntity } from './product.entity';
import { CharacteristicEntity } from './characteristic.entity';
import { IWithPriceIngredient } from '../ingredient/interfaces/withPrice.ingredient.interface';
import { IngredientEntity } from './ingredient.entity';

export class CartItemEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _product: IProductToCart;
	private readonly _characteristic: IDisplayCharacteristic;
	private readonly _addIngredients?: IWithPriceIngredient[];

	constructor({ id, product, characteristic, ingredientsToAdds }: createCartItemEntityType) {
		this._id = id;
		this._product = new ProductEntity(product).getProductToCart();
		this._characteristic = new CharacteristicEntity(characteristic).getDisplay();
		this._addIngredients = ingredientsToAdds?.map((addIngredient) =>
			new IngredientEntity({
				id: addIngredient.ingredientsToAdd.ingredient.id,
				name: addIngredient.ingredientsToAdd.ingredient.name,
				price: addIngredient.ingredientsToAdd.price,
			}).getWithPrice(),
		);
	}

	get id(): number {
		return this._id;
	}

	get product(): IProductToCart {
		return this._product;
	}

	get characteristic(): IDisplayCharacteristic {
		return this._characteristic;
	}

	getDisplay(): IDisplayCartItem {
		return {
			id: this._id,
			product: this._product,
			characteristic: this._characteristic,
			addIngredients: this._addIngredients,
		};
	}
}
