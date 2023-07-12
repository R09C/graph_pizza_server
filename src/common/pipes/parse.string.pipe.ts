import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TYPE_ERROR } from '../crud.constants';

@Injectable()
export class ParseStringPipe implements PipeTransform<string, string> {
	transform(value: string): string {
		if (typeof value !== 'string') {
			throw new BadRequestException(TYPE_ERROR);
		}
		return value;
	}
}
