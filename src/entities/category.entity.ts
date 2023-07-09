import { CategorySchema,ProductSchema } from '@prisma/client';
import { IDisplayCategory } from 'src/category/interface/category.display.interface';

export class CategoryEntity{
	

	private readonly _id:number;
	private readonly _name:string;
	private readonly _product:string[];

	constructor({id,name,products}:CategorySchema & {products?:{name:ProductSchema}[]}){
		this._id=id;
		this._name=name; 
		this._product=products?.map(product=>product.name.name)||[];
	}
	
	get id():number{
		return this._id;
	}
	
	get name():string{
		return this._name;
	}
	
	get product():string[]{
		return this._product;
	}

	getDisplayCategory():IDisplayCategory{
		return {
			id:this._id,
			name:this._name,
		}
	}

}