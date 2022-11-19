export class CityModel {
	id: string;
	isActive: boolean;
	name: string;

	constructor(init?: Partial<CityModel>) {
		Object.assign(this, init);
	}
}
