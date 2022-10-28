import { createAction, props } from '@ngrx/store';
import { ENUM_CATEGORY_ACTION } from 'src/app/_store/store.action.enum';

export const categorySelected = createAction(
	ENUM_CATEGORY_ACTION.CATEGORY_SELECTED,
	props<{
		id: string;
		slug: string;
		name: string;
	}>(),
);
