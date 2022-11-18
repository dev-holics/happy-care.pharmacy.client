import { CityModel } from 'src/app/_models/city.model';

export class DistrictModel {
	id: string;
	name: string;
	isActive: boolean;
	cityId?: string;
	city?: CityModel;

	constructor(init?: Partial<DistrictModel>) {
		Object.assign(this, init);
	}
}
