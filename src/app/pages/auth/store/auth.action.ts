import { createAction, props } from '@ngrx/store';
import { ENUM_AUTH_ACTION } from 'src/app/_store/store.action.enum';

export const loginAction = createAction(
	ENUM_AUTH_ACTION.AUTH_LOGIN,
	props<{
		phoneNumber: string;
		password: string;
	}>(),
);

export const registerAction = createAction(
	ENUM_AUTH_ACTION.AUTH_LOGIN,
	props<{
		phoneNumber: string;
		password: string;
		confirmPassword: string;
		fullname: string;
		email: string;
	}>(),
);
