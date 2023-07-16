import { IBaseEntity } from './base.entity.interface';

export interface IBaseFactory<T extends IBaseEntity> {
	createEntity: (schema: any) => T;
	createEntities: (schemas: any[]) => Record<string, any>[];
}
