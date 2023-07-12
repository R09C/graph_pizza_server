import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/auth/dtos/register.dto';
import { LoginDto } from '../src/auth/dtos/login.dto';

const testRegisterDto: RegisterDto = {
	email: 'graph@graph.com',
	password: 'graph',
};

const testLoginDto: LoginDto = {
	email: 'graph@graph.com',
	password: 'graph',
};

let userId: number;

describe('AppController (e2e)', () => {
	let app: INestApplication;
	

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/register (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/register')
			.send(testRegisterDto);
		userId = body._id;
		expect(body._email).toBe(testRegisterDto.email);
		expect(body._password).not.toBe(testRegisterDto.password);
	});

	it('/auth/login (POST) - success', async () => {
		const { body } = await request(app.getHttpServer()).post('/auth/login').send(testLoginDto);
		expect(body.user.email).toBe(testRegisterDto.email);
		expect(body.user.id).toBe(userId);
		expect(body.token).toBeDefined();
	});

});

export { userId };