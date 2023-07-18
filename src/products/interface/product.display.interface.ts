import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';

export interface IDisplayProduct {
	id: number;
	name: string;
	ingredients: IDisplayIngredient[];
	characteristics: IDisplayCharacteristic[];
}
