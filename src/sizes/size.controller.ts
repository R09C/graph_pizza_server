import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { SizeCreateDto } from './dtos/size.create.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
	constructor(private readonly sizeService: SizeService) {}

	@Get()
	async getAllSizes() {
		try {
			return await this.sizeService.getAllSizes();
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getSizeById(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.sizeService.getSizeById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createSize(@Body() dto: SizeCreateDto) {
		try {
			console.log(dto);
			return await this.sizeService.createSize(dto);
		} catch (error) {
			console.log(error,dto);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async DeleteSize(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.sizeService.deleteSize(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
