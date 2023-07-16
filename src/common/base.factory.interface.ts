import { IBaseEntity } from './base.entity.interface';
import { IBaseDisplay } from "../common/interceptors/display.interface";

export interface IBaseFactory<K extends IBaseDisplay,T extends IBaseEntity<K>> {
	createEntity: (schema: any) => T;
	createEntities:(schemes: any[])=>T[]|K[];
}
