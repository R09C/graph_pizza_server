import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { FactoryModule } from '../factory/factory.module';
import { PicturesRepository } from './pictures.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	controllers: [PicturesController],
	providers: [PicturesService, PicturesRepository],
	imports: [FactoryModule, PrismaModule],
})
export class PicturesModule {}
