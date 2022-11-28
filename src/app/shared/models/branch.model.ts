import { DistrictModel } from 'src/app/shared/models/district.model';

export class BranchModel {
	id: string;
	address: string;
	isActive: boolean;
	district: DistrictModel;

	constructor(init?: Partial<BranchModel>) {
		Object.assign(this, init);
	}
}
