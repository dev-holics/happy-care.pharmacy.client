import { ReceiverModel } from 'src/app/pages/cart/models';
import { PAYMENT_METHOD, PAYMENT_METHOD_TYPE } from 'src/app/_config';
import { createReducer, on } from '@ngrx/store';
import { updateReceiverInfo } from 'src/app/pages/cart/store/order/order.action';

export interface State {
	receiverInfo: ReceiverModel;
	paymentMethod: PAYMENT_METHOD_TYPE;
	processingStep: number;
}

const initialState: State = {
	receiverInfo: new ReceiverModel(),
	paymentMethod: PAYMENT_METHOD.CASH,
	processingStep: 1,
};

export const orderReducer = createReducer(
	initialState,
	on(updateReceiverInfo, (state, action) => {
		const { receiverInfo } = action;

		return {
			...state,
			receiverInfo,
		};
	}),
);
