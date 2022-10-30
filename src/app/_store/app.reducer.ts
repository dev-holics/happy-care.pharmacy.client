import { ActionReducerMap } from '@ngrx/store';
import * as CategoryReducer from 'src/app/pages/category/store/category.reducer';

export interface AppState {
	category: CategoryReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
	category: CategoryReducer.categoryReducer,
};
