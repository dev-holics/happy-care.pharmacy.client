import { createAction, props } from '@ngrx/store';
import { ENUM_CATEGORY_ACTION } from 'src/app/_store/store.action.enum';
import { CategoryModel } from 'src/app/pages/category/models/category.model';

export const setCategories = createAction(
	ENUM_CATEGORY_ACTION.SET_CATEGORY,
	props<{
		categories: CategoryModel[];
	}>(),
);

export const getCategories = createAction(ENUM_CATEGORY_ACTION.GET_CATEGORY);
