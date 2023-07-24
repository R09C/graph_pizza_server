import { Injectable } from '@nestjs/common';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';
import { CharacteristicEntity } from '../entities/characteristic.entity';
import { CharacteristicRepository } from './characteristic.repository';
import { IDisplayCharacteristic } from './interfaces/display-characteristic.interface';

@Injectable()
export class CharacteristicService {
	constructor(private readonly characteristicRepository: CharacteristicRepository) {}

	async getAllCharacteristics(): Promise<IDisplayCharacteristic[]> {
		return this.characteristicRepository.getAllCharacteristics();
	}

	async getCharacteristicById(id: number): Promise<CharacteristicEntity> {
		return this.characteristicRepository.getCharacteristicById(id);
	}

	async checkProductToCharacteristic(
		productId: number,
		characteristicId: number,
	): Promise<boolean> {
		const isExist = await this.characteristicRepository.checkCharacteristicToProduct(
			productId,
			characteristicId,
		);
		return !!isExist;
	}

	async createCharacteristic(dto: CharacteristicCreateDto): Promise<CharacteristicEntity> {
		return this.characteristicRepository.createCharacteristic(dto);
	}

	async deleteCharacteristic(id: number): Promise<CharacteristicEntity> {
		return this.characteristicRepository.deleteCharacteristic(id);
	}
}
