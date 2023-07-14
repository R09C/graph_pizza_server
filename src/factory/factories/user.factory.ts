import { IBaseFactory } from '../../common/base.factory.interface';
import { UserSchema } from '@prisma/client';
import { UserEntity } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { IDisplayUser } from '../../users/interfaces/display-user.interface';

@Injectable()
export class UserFactory implements IBaseFactory<UserEntity> {
	createEntity(schema: UserSchema | null): UserEntity {
		if (!schema) return null;
		return new UserEntity(schema);
	}

	createEntites(massSchema: UserSchema[] | null): IDisplayUser[] {
		const massEntity = massSchema.map((schema) => new UserEntity(schema).getDisplay());
		return massEntity;
	}
}
