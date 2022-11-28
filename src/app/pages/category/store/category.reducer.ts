import { CategoryModel } from 'src/app/pages/category/models/category.model';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from 'src/app/pages/category/store/category.action';

export interface State {
	categories: CategoryModel[];
}

const initialState: State = {
	categories: [],
};

export const categoryReducer = createReducer(
	initialState,
	on(CategoryActions.setCategories, (state, action) => ({
		...state,
		categories: [...action.categories],
	})),
);
