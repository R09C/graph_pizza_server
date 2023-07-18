import { Injectable } from '@nestjs/common';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';
import { CharacteristicEntity } from '../entities/characteristic.entity';
import { CharacteristicRepository } from './characteristic.repository';

@Injectable()
export class CharacteristicService {
	constructor(private readonly сharacteristicRepository: CharacteristicRepository) {}

	async getAllCharacteristics(): Promise<CharacteristicEntity[]> {
		return this.сharacteristicRepository.getAllCharacteristics();
	}

	async getCharacteristicById(id: number): Promise<CharacteristicEntity> {
		return this.сharacteristicRepository.getCharacteristicById(id);
	}

	async createCharacteristic(dto: CharacteristicCreateDto): Promise<CharacteristicEntity> {
		return this.сharacteristicRepository.createCharacteristic(dto);
	}

	async deleteCharacteristic(id: number): Promise<CharacteristicEntity> {
		return this.сharacteristicRepository.deleteCharacteristic(id);
	}
}
