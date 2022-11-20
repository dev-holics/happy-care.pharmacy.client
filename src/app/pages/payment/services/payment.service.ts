import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';

@Injectable({ providedIn: 'root' })
export class PaymentService {
	constructor(private httpService: HttpService) {}

	async getCallBackVnPay(params: any) {
		const queryString = this.httpService.convertQueryString(params);
		const url = `${URL_CONFIG.ORDER_URL}/callback${queryString}`;
		return this.httpService.get(url);
	}
}
