import { DistrictModel } from 'src/app/_models/district.model';

export class BranchModel {
	id: string;
	address: string;
	isActive: boolean;
	district: DistrictModel;

	constructor(init?: Partial<BranchModel>) {
		Object.assign(this, init);
	}
}
