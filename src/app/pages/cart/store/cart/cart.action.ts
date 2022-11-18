import { createAction, props } from '@ngrx/store';
import { ENUM_CART_ACTION } from 'src/app/_store/store.action.enum';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { CartItemModel } from 'src/app/pages/cart/models';

export const addToCart = createAction(
	ENUM_CART_ACTION.ADD_TO_CART,
	props<{
		product: ProductModel;
		quantity: number;
	}>(),
);

export const setToCart = createAction(
	ENUM_CART_ACTION.SET_TO_CART,
	props<{
		cartItems: CartItemModel[];
	}>(),
);

export const removeFromCart = createAction(
	ENUM_CART_ACTION.REMOVE_FROM_CART,
	props<{
		productId: string;
	}>(),
);

export const removeAllFromCart = createAction(
	ENUM_CART_ACTION.REMOVE_ALL_FROM_CART,
);

export const loadCartFromLocalStorage = createAction(
	ENUM_CART_ACTION.LOAD_CART_FROM_LOCAL_STORAGE,
);
