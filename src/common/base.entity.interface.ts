export interface IBaseEntity<K> {
	id: number;
	getDisplay: () => K;
}
