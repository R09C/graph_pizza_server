import { ProductSchema } from '@prisma/client';

export interface IBaseSchema extends ProductSchema {
	ingredients: {
		ingredient: {
			name: string;
		};
	}[];
} 