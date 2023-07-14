import { PrismaClient } from '@prisma/client';
import { UsersCreateDto } from 'src/users/dtos/users-create.dto';

const prisma = new PrismaClient();
const default_roles = ['USER', 'ACTIVATED_USER', 'ADMIN'];
const test_creat_dto: UsersCreateDto = {
	email: 'test@mail.ru',
	password: 'test',
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
		where: { email: test_creat_dto.email },
		update: {},
		create: {
			...test_creat_dto,
			roles: {
				create: { role: { connect: { value: 'USER' } } },
			},
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
