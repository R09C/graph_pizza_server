import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { IWithPriceIngredient } from '../../ingredient/interfaces/withPrice.ingredient.interface';
import { IBaseDisplay } from 'src/common/interceptors/display.interface';

export interface IDisplayCartItem extends IBaseDisplay {
	product: IProductToCart;
	characteristic: IDisplayCharacteristic;
	addIngredients?: IWithPriceIngredient[];
}
