import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';

@Injectable({ providedIn: 'root' })
export class CartService {
	constructor(private httpService: HttpService) {}

	async getCartOfCurrentUser() {
		const url = `${URL_CONFIG.CART_URL}/items`;
		const res = await this.httpService.get(url);
		return res?.data || [];
	}

	updateCartOfCurrentUser(
		cartItems: {
			quantity: number;
			productId: string;
		}[],
	) {
		const url = `${URL_CONFIG.CART_URL}/items`;
		return this.httpService.put(url, cartItems);
	}
}
