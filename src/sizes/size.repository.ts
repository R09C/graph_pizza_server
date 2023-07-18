import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SizeEntity } from '../entities/size.entity';
import { SizeFactory } from '../factory/factories/size.factory';
import { SizeCreateDto } from './dtos/size.create.dto';


@Injectable()
export class SizeRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly sizeFactory: SizeFactory,
	) {}

	async getAllSizes(): Promise<SizeEntity[]> {
		const Sizes = await this.prismaService.sizeSchema.findMany();
		return this.sizeFactory.createEntities(Sizes);
	}

	async getSizeById(id: number): Promise<SizeEntity | null> {
		const size = await this.prismaService.sizeSchema.findFirst({
			where: { id },
		});
		return this.sizeFactory.createEntity(size);
	}

	async createSize({ value,unitId }: SizeCreateDto): Promise<SizeEntity | null> {
		const size = await this.prismaService.sizeSchema.create({
			data: {
				value: value,
				unit: { connect: { id: unitId} },
			},
		});

		return this.sizeFactory.createEntity(size);
	}

	async deleteSize(id: number): Promise<SizeEntity | null> {
		const size = await this.prismaService.sizeSchema.delete({
			where: { id },
		});

		return this.sizeFactory.createEntity(size);
	}
}
