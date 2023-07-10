import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { send } from 'process';

const testRegisterDto:RegisterDto={
	email:"test@mail.ru",
	password:"test",
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

	it('/role/register (POST)',async (done) => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send(testRegisterDto)
			.expect(201)
			.then(({body}:request.Response)=>{
				expect(body.email).toBeDefined();
				done();
			})
	});

	it('/auth/register (POST)',async (done) => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send(testRegisterDto)
			.expect(201)
			.then(({body}:request.Response)=>{
				expect(body.email).toBeDefined();
				done();
			})
	});
});
