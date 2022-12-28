import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { CartModel, ReceiverModel } from 'src/app/pages/cart/models';
import { BranchModel } from 'src/app/shared/models/branch.model';
import {
	DELIVERY_FEE,
	FREE_DELIVERY_THRESHOLD,
	URL_CONFIG,
} from 'src/app/_config';
import {
	PaginationResponseModel,
	ResponseModel,
} from 'src/app/_models/response.model';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { OrderHistoryModel } from 'src/app/pages/profile/models/order-history.model';
import { DatetimeHelper } from 'src/app/_helpers/datetime.helper';
import { ImageHelper } from 'src/app/_helpers/image.helper';
import { faker } from '@faker-js/faker';
import { firstValueFrom } from 'rxjs';
import { ErrorHandlerHelper } from 'src/app/_helpers/error-handler.helper';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class OrderService {
	constructor(private httpService: HttpService, private errorHandler: ErrorHandlerHelper) {}

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
      delivery: d.delivery,
      updatedAt: `${moment(d.updatedAt).add(7, 'hours').format('l')} ${moment(d.updatedAt).add(7,'hours').format('LTS')}`,
      orderPayment: d.orderPayment,
		}));

		return {
			data: orders,
			totalData: res?.totalData || 0,
			success: true,
		};
	}

	async getOrderDetail(
		orderId: string,
	): Promise<ResponseModel<OrderHistoryModel>> {
		const url = `${URL_CONFIG.ORDER_URL}/${orderId}`;

		const res = await this.httpService.get(url);

		if (!res) {
			return {
				data: null,
				success: false,
			};
		}

		const orderDetails = res?.orderDetails?.map((orderDetail: any) => {
			const imageUrls = ImageHelper.getListUrlFromImages(
				orderDetail.product?.images,
			);

			return {
				quantity: orderDetail.quantity,
				productName: orderDetail.product?.name,
				productPrice: orderDetail.product?.price,
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

  async cancelOrder(
    orderId: string,
  ) : Promise<any> {
    const url = `${URL_CONFIG.ORDER_URL}/${orderId}/status`;
		return firstValueFrom(await this.httpService.put(url, { status: 'CANCELED' }))
      .catch(err => {
        return this.handleError(err);
      });
  }

  async receiveOrder(
    orderId: string,
  ) : Promise<any> {
    const url = `${URL_CONFIG.ORDER_URL}/${orderId}/status`;
		return firstValueFrom(await this.httpService.put(url, { status: 'RECEIVED' }))
      .catch(err => {
        return this.handleError(err);
      });
  }

  handleError(err: any) {
		if (
			err instanceof HttpErrorResponse &&
			err.status != HttpStatusCode.Unauthorized
		) {
			return err.error;
		}
		this.errorHandler.handleError(err);
	}

	async sendPaymentRequest(
		cartData: CartModel,
		receiverInfo: ReceiverModel,
		branch: BranchModel | undefined,
		paymentType: string,
		orderType: string,
    delivery: string,
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
      delivery,
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
