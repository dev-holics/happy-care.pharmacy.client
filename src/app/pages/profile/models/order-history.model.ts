import { BranchModel } from 'src/app/shared/models/branch.model';
import { ReceiverModel } from 'src/app/pages/cart/models';
import {OrderDetailModel} from "src/app/pages/profile/models/order-detail.model";

export class OrderHistoryModel {
	id: string;
	orderCode: string;
	paymentType: string;
	orderType: string;
	status: string;
	totalPrice: number;
  orderDate: string;
	branch: BranchModel;
	userSetting: ReceiverModel;
  orderDetails?: OrderDetailModel[];

	constructor(init?: Partial<OrderHistoryModel>) {
		Object.assign(this, init);
	}
}
