export interface IBaseEntity {
	id: number;
	getDisplay: () => Record<string, any>;
}
