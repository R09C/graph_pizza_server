import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
	data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const httpContext = context.switchToHttp();
		const req = httpContext.getRequest();
		const { method, body, headers } = req;

		const className = context.getClass().name;

		return next.handle().pipe(
			map((data) => {
				if (!data) {
					switch (method) {
						case 'GET':
							throw new NotFoundException('Не найден!');
						case 'POST':
							throw new BadRequestException('Ошибка создания!');
						case 'PUT':
							throw new BadRequestException('Ошибка обновления!');
						case 'DELETE':
							throw new BadRequestException('Ошибка удаления!');
					}
				}
				return data?.getDisplay ? data.getDisplay() : data;
			}),
		);
	}
}
