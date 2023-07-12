import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { send } from 'process';
import { LoginDto } from 'src/auth/dtos/login.dto';

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const testRegisterDto:RegisterDto={
	email:`test-${generateRandomString(5)}@mail.ru`,
	password:"test",
}

const testLoginDto:LoginDto={
	email:testRegisterDto.email,
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

	it('/auth/register (POST)', (done) => {
    request(app.getHttpServer())
        .post('/auth/register')
        .send(testRegisterDto)
        .then(({ body }: request.Response) => {
			expect(201);
            expect(body.email).toBeDefined();
			expect(body.email).toEqual(testRegisterDto.email);
            done();
        });
	});

	it('/auth/login (POST)', (done) => {
    request(app.getHttpServer())
        .post('/auth/login')
        .send(testLoginDto)
        .then(( {body} : request.Response) => {
			expect(200);
            expect(body.user.email).toBeDefined();
			expect(body.user.email).toEqual(testLoginDto.email);
			expect(body.token).toBeDefined();
            done();
        });
	});

	it('/auth/login (POST)', (done) => {
    request(app.getHttpServer())
        .post('/auth/login')
        .send(testLoginDto)
        .then(( {body} : request.Response) => {
			expect(200);
            expect(body.user.email).toBeDefined();
			expect(body.user.email).toEqual(testLoginDto.email);
			expect(body.token).toBeDefined();
            done();
        });
	});

});
