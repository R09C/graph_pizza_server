import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IngredientCreateDto } from '../src/ingredient/dtos/ingredient-create.dto';
import { ProductCreateDto } from '../src/products/dtos/product-create.dto';

const id = 1;

const test_product_creat_dto: ProductCreateDto = {
	name: 'test_2',
	categoryId: 1,
	ingredients: [{ ingredientId: 1 }],
};

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		jest.setTimeout(60000);
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/products/ (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get('/products/');
		expect(200);
		expect(Array.isArray(body)).toBe(true);
	});

	it('/products/create/ (POST)', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/products/create/')
			.send(test_product_creat_dto);
		// console.log(body)
		expect(201);
		expect(test_product_creat_dto.name === body._name).toBe(true);
	});

	it('/products/:id (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get(`/products/${id}`);
		expect(200);
		// console.log(body);
		expect(body._id === id).toBe(true);
		expect(body._name === test_product_creat_dto.name).toBe(true);
	});

	it('/products/:id (DELETE)', async () => {
		const { body } = await request(app.getHttpServer()).delete(`/products/${id}`);
		expect(200);
		console.log(body);
		expect(body._id === id).toBe(true);
		expect(typeof body._name === 'string').toBe(true);
	});
});
