import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { CartItemModel } from 'src/app/pages/cart/models/cart-item.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import { MenuItem } from 'primeng/api';
import { PAYMENT_METHOD_TYPE } from 'src/app/_config';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
	subscription = new Subscriber();

	cartItems: CartItemModel[];
	cartQuantity: number;
	totalPrice: number;

	// 3: delivery method
	methodTabItems: MenuItem[];
	activeMethodTab: MenuItem;

	// 4: payment method
	selectedPaymentMethod: PAYMENT_METHOD_TYPE = 'CASH';

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.initMethodTab();
		this.getCartItems();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initMethodTab() {
		this.methodTabItems = [
			{
				label: 'Giao hàng tận nơi',
				id: 'cod',
				command: this.changeDeliveryMethodTab.bind(this),
			},
			{
				label: 'Nhận tại nhà thuốc',
				id: 'offline',
				command: this.changeDeliveryMethodTab.bind(this),
			},
		];

		this.activeMethodTab = this.methodTabItems[0];
	}

	getCartItems() {
		this.store.select('cart').subscribe(cartData => {
			this.cartItems = cartData.items;
			this.totalPrice = cartData.totalPrice;
			this.cartQuantity = cartData.totalQuantity;
		});
	}

	changeDeliveryMethodTab(_event: any) {
		const selectedTab = this.methodTabItems.find(
			t => t.id === _event?.item?.id,
		);

		if (selectedTab) {
			this.activeMethodTab = selectedTab;
		}
	}

	changePaymentMethod(method: PAYMENT_METHOD_TYPE) {
		this.selectedPaymentMethod = method;
	}
}
