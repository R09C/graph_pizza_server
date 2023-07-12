import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors();

	app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, whitelist: true }));
	app.useGlobalInterceptors(new ResponseInterceptor());

	await app.listen(PORT, () => {
		console.log(`SERVER STARTED ON ${PORT} PORT!`);
	});
}

bootstrap();
