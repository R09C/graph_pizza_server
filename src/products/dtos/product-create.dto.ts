export class ProductCreateDto {
	name: string;
	categoryId: number;
	ingredients: { ingredientId:number }[];
}