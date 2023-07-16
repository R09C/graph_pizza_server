import { PrismaClient } from '@prisma/client';
import { UsersCreateDto } from '../src/users/dtos/users-create.dto';
import { IngredientCreateDto } from 'src/ingredient/dtos/ingredient-create.dto';

const prisma = new PrismaClient();
const default_roles = ['USER', 'ACTIVATED_USER', 'ADMIN'];
const test_user_creat_dto: UsersCreateDto = {
	email: 'test@mail.ru',
	password: 'test',
};
const test_ingredient_creat_dto: IngredientCreateDto = {
	name: 'test',

};
const test_category_creat_dto: IngredientCreateDto = {
	name: 'test',

};

async function main() {
	for (const role of default_roles) {
		await prisma.roleSchema.upsert({
			where: { value: role },
			update: {},
			create: { value: role },
		});
	}
	
	await prisma.userSchema.upsert({
		where: { email: test_user_creat_dto.email },
		update: {},
		create: {
			...test_user_creat_dto,
			roles: {
				create: { role: { connect: { value: 'USER' } } },
			},
		},
	});

	await prisma.categorySchema.upsert({
		where: { name: test_category_creat_dto.name },
		update: {},
		create: {
			...test_category_creat_dto,
		},
	});

	await prisma.ingredientSchema.upsert({
		where: { name: test_ingredient_creat_dto.name },
		update: {},
		create: {
			...test_ingredient_creat_dto,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
