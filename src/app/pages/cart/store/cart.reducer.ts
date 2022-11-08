import { CartItemModel } from 'src/app/pages/cart/models/cart-item.model';
import { createReducer, on } from '@ngrx/store';
import {
	addToCart,
	loadCartFromLocalStorage,
	removeFromCart,
	removeAllFromCart,
} from 'src/app/pages/cart/store/cart.action';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

export interface State {
	items: CartItemModel[];
	totalPrice: number;
	totalQuantity: number;
	isFreeDelivery: boolean;
}

const initialState: State = {
	items: [],
	totalPrice: 0,
	totalQuantity: 0,
	isFreeDelivery: false,
};

export const cartReducer = createReducer(
	initialState,
	on(addToCart, (state, action) => {
		const { product, quantity } = action;
		const existedProductIndex = state.items.findIndex(
			item => item.productId === product.id,
		);

		let newState: State;
		const totalPrice = state.totalPrice + product.price * quantity;
		const totalQuantity = state.totalQuantity + quantity;

		if (existedProductIndex >= 0) {
			newState = {
				...state,
				totalPrice,
				totalQuantity,
				items: state.items.map((item, index) => {
					if (index === existedProductIndex) {
						return {
							...item,
							quantity: item.quantity + quantity,
						};
					}

					return item;
				}),
			};
		} else {
			newState = {
				...state,
				totalPrice,
				totalQuantity,
				items: [
					...state.items,
					{
						quantity,
						productId: product.id,
						price: product.price,
						productName: product.name,
						imageUrl: product.imageUrl,
						packingSpec: product.packingSpec,
						discount: product.discount || 0,
					},
				],
			};
		}

		LocalStorageHelper.setCartState(newState);
		return newState;
	}),
	on(loadCartFromLocalStorage, (state, _action) => {
		const cart = LocalStorageHelper.getCartState();
		if (!cart) return state;
		return cart;
	}),
	on(removeFromCart, (state, action) => {
		const { productId } = action;

		const product = state.items.find(item => item.productId === productId);

		if (!product) return { ...state };

		const updatedCart = {
			...state,
			totalPrice: state.totalPrice - product.quantity * product.price,
			totalQuantity: state.totalQuantity - product.quantity,
			items: state.items.filter(item => item.productId !== productId),
		};

		LocalStorageHelper.setCartState(updatedCart);
		return updatedCart;
	}),
	on(removeAllFromCart, (state, action) => {
		LocalStorageHelper.removeCartState();

		return {
			...initialState,
		};
	}),
);
