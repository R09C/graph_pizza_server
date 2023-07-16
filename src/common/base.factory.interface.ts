import { IBaseEntity } from './base.entity.interface';

export interface IBaseFactory<T extends IBaseEntity> {
	createEntity: (schema: any) => T;
	createEntities: (schema: any[]) => Record<string, any>[];
}
