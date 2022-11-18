import { createAction, props } from '@ngrx/store';
import { ENUM_ORDER_ACTION } from 'src/app/_store/store.action.enum';
import { ReceiverModel } from 'src/app/pages/cart/models';

export const updateReceiverInfo = createAction(
	ENUM_ORDER_ACTION.UPDATE_RECEIVER_INFO,
	props<{
		receiverInfo: ReceiverModel;
	}>(),
);
