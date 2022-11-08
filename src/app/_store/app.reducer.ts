import { ActionReducerMap } from '@ngrx/store';
import * as CategoryReducer from 'src/app/pages/category/store/category.reducer';
import * as CartReducer from 'src/app/pages/cart/store/cart.reducer';

export interface AppState {
	category: CategoryReducer.State;
	cart: CartReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
	category: CategoryReducer.categoryReducer,
	cart: CartReducer.cartReducer,
};
