import { IsString } from 'class-validator';

export class PictureCreateDto {
	@IsString()
	name: string;

	link: string;
	file: Express.Multer.File;
}
