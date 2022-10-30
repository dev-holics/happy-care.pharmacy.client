import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(private httpService: HttpService) {}

	async getProducts(queryObject: any): Promise<ProductModel[]> {
		const query = this.httpService.convertQueryString(queryObject);
		const url = `${URL_CONFIG.PRODUCT_PUBLIC_URL}/list${query}`;
		const res = await this.httpService.get(url);

		return res?.data;
	}
}
