import { ActionReducerMap } from '@ngrx/store';
import * as CategoryReducer from 'src/app/pages/category/store/category.reducer';
import * as CartReducer from 'src/app/pages/cart/store/cart/cart.reducer';
import * as OrderReducer from 'src/app/pages/cart/store/order/order.reducer';
import * as ShareReducer from 'src/app/shared/store/share.reducer';

export interface AppState {
	category: CategoryReducer.State;
	cart: CartReducer.State;
	order: OrderReducer.State;
  share: ShareReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
	category: CategoryReducer.categoryReducer,
	cart: CartReducer.cartReducer,
	order: OrderReducer.orderReducer,
  share: ShareReducer.shareReducer,
};
