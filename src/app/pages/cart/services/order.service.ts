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
import { OrderHistoryModel } from 'src/app/pages/profile/models/order-history.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
	constructor(private httpService: HttpService) {}

	async getOrderHistory(
		params: any,
	): Promise<ResponseModel<OrderHistoryModel[]>> {
		const queryString = this.httpService.convertQueryString(params);
		const url = `${URL_CONFIG.ORDER_URL}/history${queryString}`;

		const res = await this.httpService.get(url);

		if (res?.statusCode !== HttpStatusCode.Ok) {
			return {
				data: null,
				success: false,
			};
		}

		const orders: OrderHistoryModel[] = res?.data.map((d: any) => ({
			id: d.id,
			orderCode: d.orderCode,
			paymentType: d.paymentType,
			orderType: d.orderType,
			status: d.status,
			totalPrice: d.totalPrice,
			branch: d.branch,
			userSetting: d.userSetting,
		}));

		return {
			data: orders,
			success: true,
		};
	}

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
