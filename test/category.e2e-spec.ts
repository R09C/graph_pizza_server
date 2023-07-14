import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CategoryCreateDto } from '../src/category/dtos/category-create.dto';

const id = 1;

const testCategoryCreate: CategoryCreateDto = {
	name: 'test',
};

CategoryCreateDto;
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

	it('/categories/ (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get('/categories/');
		expect(200);
		expect(Array.isArray(body)).toBe(true);
	});

	it('/categories/create/ (POST)', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/categories/create/')
			.send(testCategoryCreate);
		expect(201);
		expect(testCategoryCreate.name === body._name).toBe(true);
	});

	it('/categories/:id (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get(`/categories/${id}`);
		expect(200);
		expect(body._id === id).toBe(true);
		expect(body._name === testCategoryCreate.name).toBe(true);
	});

	it('/users/:id (DELETE)', async () => {
		const { body } = await request(app.getHttpServer()).delete(`/categories/${id}`);
		expect(200);
		expect(body._id === id).toBe(true);
		expect(typeof body._name === 'string').toBe(true);
	});
});
