import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';
import { CharacteristicEntity } from '../entities/characteristic.entity';
import { CharacteristicFactory } from '../factory/factories/characteristic.factory';

@Injectable()
export class CharacteristicRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly characteristicFactory: CharacteristicFactory,
	) {}

	async getAllCharacteristics(): Promise<CharacteristicEntity[]> {
		const characteristics = await this.prismaService.characteristicSchema.findMany();
		return this.characteristicFactory.createEntities(characteristics);
	}

	async getCharacteristicById(id: number): Promise<CharacteristicEntity | null> {
		const characteristic = await this.prismaService.characteristicSchema.findFirst({
			where: { id },
		});
		return this.characteristicFactory.createEntity(characteristic);
	}

	async createCharacteristic(
		data: CharacteristicCreateDto,
	): Promise<CharacteristicEntity | null> {
		const characteristic = await this.prismaService.characteristicSchema.create({ data });
		return this.characteristicFactory.createEntity(characteristic);
	}

	async deleteCharacteristic(id: number): Promise<CharacteristicEntity | null> {
		const characteristic = await this.prismaService.characteristicSchema.delete({
			where: { id },
		});
		return this.characteristicFactory.createEntity(characteristic);
	}
}
