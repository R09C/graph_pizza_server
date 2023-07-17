import { Injectable } from '@nestjs/common';
import { SizeEntity } from '../entities/size.entity';
import { SizeRepository } from './size.repository';
import { SizeCreateDto } from './dtos/size.create.dto';

@Injectable()
export class SizeService {
	constructor(private readonly sizeRepository: SizeRepository) {}

	async getAllSizes(): Promise<SizeEntity[]> {
		return this.sizeRepository.getAllSizes();
	}

	async getSizeById(id: number): Promise<SizeEntity> {
		return this.sizeRepository.getSizeById(id);
	}

	async createSize(dto: SizeCreateDto): Promise<SizeEntity> {
		return this.sizeRepository.createSize(dto);
	}

	async deleteSize(id: number): Promise<SizeEntity> {
		return this.sizeRepository.deleteSize(id);
	}
}
