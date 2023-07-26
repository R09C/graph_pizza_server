import { IBaseDisplay } from '../../common/interceptors/display.interface';

export interface IWithPriceIngredient extends IBaseDisplay {
	name: string;
	price?:number;
}
