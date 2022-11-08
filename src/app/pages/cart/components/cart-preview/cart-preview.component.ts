import { isEmpty } from 'radash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/pages/cart/models/cart-item.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import {
	removeAllFromCart,
	removeFromCart,
} from 'src/app/pages/cart/store/cart.action';
import { Subscriber } from 'rxjs';

@Component({
	selector: 'app-cart-preview',
	templateUrl: './cart-preview.component.html',
	styleUrls: ['./cart-preview.component.scss'],
})
export class CartPreviewComponent implements OnInit, OnDestroy {
	subscription = new Subscriber();

	cartItems: CartItemModel[];
	totalPrice: number;

	isCartEmpty: boolean;
	isWarningRemoveAllCartVisible: boolean = false;
	isWarningRemoveCartItemVisible: boolean = false;

	selectedProductId: string;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.getCartItems();
		this.subscribeCartChange();
		this.isCartEmpty = isEmpty(this.cartItems);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getCartItems() {
		this.store.select('cart').subscribe(cartData => {
			this.cartItems = cartData.items;
			this.totalPrice = cartData.totalPrice;
		});
	}

	subscribeCartChange() {
		this.subscription.add(
			this.store.select('cart').subscribe(cart => {
				this.isCartEmpty = cart.totalQuantity === 0;
			}),
		);
	}

	getProductTitle(itemId: string) {
		let title = '';

		const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
		if (itemIndex < 0) return '';

		if (this.cartItems[itemIndex].productName) {
			title += this.cartItems[itemIndex].productName;
		}

		if (this.cartItems[itemIndex].packingSpec) {
			title += `- ${this.cartItems[itemIndex].packingSpec}`;
		}

		return title;
	}

	removeCartItem() {
		if (!this.selectedProductId) return;
		this.store.dispatch(
			removeFromCart({
				productId: this.selectedProductId,
			}),
		);
	}

	removeAllFromCart() {
		this.store.dispatch(removeAllFromCart());
	}

	showWarningRemoveAllCart() {
		this.isWarningRemoveAllCartVisible = true;
	}

	hideWarningRemoveAllCart() {
		this.isWarningRemoveAllCartVisible = false;
	}

	showWarningRemoveCartItem(productId: string) {
		this.selectedProductId = productId;
		this.isWarningRemoveCartItemVisible = true;
	}

	hideWarningRemoveCartItem() {
		this.isWarningRemoveCartItemVisible = false;
		this.selectedProductId = '';
	}
}
