import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { CartModel, ReceiverModel } from 'src/app/pages/cart/models';
import { BranchModel } from 'src/app/shared/models/branch.model';
import {
	DELIVERY_FEE,
	FREE_DELIVERY_THRESHOLD,
	URL_CONFIG,
} from 'src/app/_config';
import { ResponseModel } from 'src/app/_models/response.model';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
	constructor(private httpService: HttpService) {}

	async sendPaymentRequest(
		cartData: CartModel,
		receiverInfo: ReceiverModel,
		branch: BranchModel | undefined,
		paymentType: string,
		orderType: string,
	): Promise<ResponseModel<string>> {
		const data = {
			paymentType,
			orderType,
			totalPrice: cartData.totalPrice,
			shipPrice:
				cartData.totalPrice > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,
			branchId: branch?.id || null,
			userSettingId: receiverInfo.id,
			products: cartData.items.map(item => ({
				quantity: item.quantity,
				productId: item.productId,
			})),
		};
		const url = `${URL_CONFIG.ORDER_URL}/payment-url`;

		const res = await this.httpService.post(url, data);

		if (res?.statusCode !== HttpStatusCode.Created) {
			return {
				data: '',
				success: false,
			};
		}

		return {
			data: res?.data?.vnpUrl || '',
			success: true,
		};
	}
}
