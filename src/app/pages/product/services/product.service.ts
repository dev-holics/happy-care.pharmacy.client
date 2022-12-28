import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { PaginationResponseModel, ResponseModel } from 'src/app/_models/response.model';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(private httpService: HttpService) {}

	async getProducts(queryObject: any): Promise<PaginationResponseModel<ProductModel[]>> {
		const query = this.httpService.convertQueryString(queryObject);
		const url = `${URL_CONFIG.PRODUCT_PUBLIC_URL}/list${query}`;
		const res = await this.httpService.get(url);

    return {
			data: res?.data,
			totalData: res?.totalData || 0,
			success: true,
		};
	}

	async getProductDetailById(
		productId: string,
		branchId: string,
	): Promise<ResponseModel<ProductModel>> {
		const queryString = this.httpService.convertQueryString({
			branchId,
		});

		const url = `${URL_CONFIG.PRODUCT_PUBLIC_URL}/${productId}${queryString}`;
		const result = await this.httpService.get(url);

		if (result.statusCode !== HttpStatusCode.Ok) {
			return {
				data: null,
				success: false,
			};
		}

		return {
			data: result.data,
			success: true,
		};
	}
}
