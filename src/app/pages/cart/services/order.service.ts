import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { CartModel, ReceiverModel } from 'src/app/pages/cart/models';
import { BranchModel } from 'src/app/shared/models/branch.model';
import {
	DELIVERY_FEE,
	FREE_DELIVERY_THRESHOLD,
	URL_CONFIG,
} from 'src/app/_config';
import {PaginationResponseModel, ResponseModel} from 'src/app/_models/response.model';
import { HttpStatusCode } from '@angular/common/http';
import { OrderHistoryModel } from 'src/app/pages/profile/models/order-history.model';
import {DatetimeHelper} from "src/app/_helpers/datetime.helper";
import {ProductModel} from "src/app/pages/product/models/product.model";
import {OrderDetailModel} from "src/app/pages/profile/models/order-detail.model";
import {ImageHelper} from "src/app/_helpers/image.helper";
import {faker} from "@faker-js/faker";

@Injectable({ providedIn: 'root' })
export class OrderService {
	constructor(private httpService: HttpService) {}

	async getOrderHistory(
		params: any,
	): Promise<PaginationResponseModel<OrderHistoryModel[]>> {
		const queryString = this.httpService.convertQueryString(params);
		const url = `${URL_CONFIG.ORDER_URL}/history${queryString}`;

		const res = await this.httpService.get(url);

		if (res?.statusCode !== HttpStatusCode.Ok) {
			return {
				data: null,
        totalData: 0,
				success: false,
			};
		}

		const orders: OrderHistoryModel[] = res?.data.map((d: any) => ({
			id: d.id,
			orderCode: d.orderCode,
			paymentType: d.paymentType,
			orderType: d.orderType,
			status: d.status,
      orderDate: DatetimeHelper.formatDateTime(d.createdAt, 'DD/MM/YYYY'),
			totalPrice: d.totalPrice,
			branch: d.branch,
			userSetting: d.userSetting,
		}));

		return {
			data: orders,
      totalData: res?.totalData || 0,
			success: true,
		};
	}

  async getOrderDetail(orderId: string): Promise<ResponseModel<OrderHistoryModel>> {
    const url = `${URL_CONFIG.ORDER_URL}/${orderId}`;

    const res = await this.httpService.get(url);

    if (!res) {
      return {
        data: null,
        success: false,
      };
    }

    const orderDetails = res?.orderDetails?.map((orderDetail: any) => {
      const imageUrls = ImageHelper.getListUrlFromImages(orderDetail.product?.images);

      return {
        quantity: orderDetail.quantity,
        productName: orderDetail.product?.name,
        productImageUrl: imageUrls ? imageUrls[0] : '' || faker.image.nature(),
      };
    });

    return {
      data: {
        ...res,
        orderDetails,
      },
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
