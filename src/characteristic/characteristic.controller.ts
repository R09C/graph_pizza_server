import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';

@Controller('characteristic')
export class CharacteristicController {
	constructor(private readonly characteristicService: CharacteristicService) {}

	@Get()
	async getAllCharacteristics() {
		try {
			return await this.characteristicService.getAllCharacteristics();
		} catch (error) {
			console.log(error)
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async getCharacteristicById(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.characteristicService.getCharacteristicById(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('create')
	async createCharacteristic(@Body() dto: CharacteristicCreateDto) {
		try {
			return await this.characteristicService.createCharacteristic(dto);
		} catch (error) {
			console.log(error);
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	async DeleteCharacteristic(@Param('id', ParseIntPipe) id: number) {
		try {
			return await this.characteristicService.deleteCharacteristic(id);
		} catch (error) {
			throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
