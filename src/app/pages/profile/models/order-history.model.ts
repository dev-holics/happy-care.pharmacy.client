import { BranchModel } from 'src/app/shared/models/branch.model';
import { ReceiverModel } from 'src/app/pages/cart/models';

export class OrderHistoryModel {
	id: string;
	orderCode: string;
	paymentType: string;
	orderType: string;
	status: string;
	totalPrice: number;

	branch: BranchModel;
	userSetting: ReceiverModel;

	constructor(init?: Partial<OrderHistoryModel>) {
		Object.assign(this, init);
	}
}
