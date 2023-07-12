import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IngredientCreateDto } from '../src/ingredient/dtos/ingredient-create.dto';

const id = 1;

const testIngredientCreate:IngredientCreateDto={
	name:"test1111"
}

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

	it('/ingredients/ (GET)', async () => {
		const {body}=await request(app.getHttpServer())
			.get('/ingredients/')
		expect(200);
		expect(Array.isArray(body)).toBe(true);
	});

	it('/ingredients/create/ (POST)', async () => {
		const {body}=await request(app.getHttpServer())
			.post('/ingredients/create/')
			.send(testIngredientCreate);
		expect(201);
		console.log(body._name);
		expect( testIngredientCreate.name === body._name).toBe(true);
	});

	it('/ingredients/:id (GET)', async () => {
		const {body}=await request(app.getHttpServer())
			.get(`/ingredients/${id}`)
		expect(200);
		expect( body._id === id).toBe(true);
		expect(body._name === testIngredientCreate.name).toBe(true);
	});

	it('/ingredients/:id (DELETE)', async () => {
		const {body}=await request(app.getHttpServer())
			.delete(`/ingredients/${id}`)
		expect(200);
		expect( body._id === id).toBe(true);
		expect(typeof body._name === 'string').toBe(true);
	});
});
