import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const id = 1;

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

	it('/users/ (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get('/users/');
		expect(200);
		expect(Array.isArray(body)).toBe(true);
	});

	it('/users/:id (GET)', async () => {
		const { body } = await request(app.getHttpServer()).get(`/users/${id}`);
		expect(200);
		expect(typeof body._email === 'string').toBe(true);
	});
});
