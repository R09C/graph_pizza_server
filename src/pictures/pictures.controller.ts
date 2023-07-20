import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PictureCreateDto } from './dtos/picture-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pictures')
export class PicturesController {
	constructor(private readonly picturesService: PicturesService) {}

	@Post('create')
	@UseInterceptors(FileInterceptor('file'))
	async createPicture(
		@UploadedFile() file: Express.Multer.File,
		@Body() createDto: PictureCreateDto,
	) {
		return this.picturesService.createPicture({ ...createDto, file });
	}
}
