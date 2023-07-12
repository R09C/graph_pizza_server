import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
const id = 20;
const email = 'test-ohyIE@mail.ru';

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

	it('/users/ (GET)', (done) => {
		request(app.getHttpServer())
			.get('/users/')
			.then(({ body }: request.Response) => {
				expect(200);
				expect(Array.isArray(body)).toBe(true);
				done();
			});
	});

	it('/users/id/:id (GET)', (done) => {
		request(app.getHttpServer())
			.get(`/users/id/${id}`)
			.then(({ body }: request.Response) => {
				expect(200);
				expect(typeof body._email === 'string').toBe(true);
				done();
			});
	});

	it('/users/email/:email (GET)', (done) => {
		request(app.getHttpServer())
			.get(`/users/email/${email}`)
			.then(({ body }: request.Response) => {
				expect(200);
				expect(typeof body._id === 'number').toBe(true);
				done();
			});
	});
});
