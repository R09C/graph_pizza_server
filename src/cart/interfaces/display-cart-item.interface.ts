import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';

export interface IDisplayCartItem {
	id: number;
	product: IProductToCart;
	characteristic: IDisplayCharacteristic;
}
