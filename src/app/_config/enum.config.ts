/* eslint-disable @typescript-eslint/naming-convention */
export enum PRODUCT_FILTER_TYPES {
	BEST_SELLER = 'SELLWELL',
	NEWEST = 'NEWEST',
	ASCENDING_PRICE = 'ASCENDING_PRICE',
	DESCENDING_PRICE = 'DESCENDING_PRICE',
}

export enum SETTING_CONTROL_TYPE {
	TEXT_BOX = 'textbox',
	TEXT_AREA = 'textarea',
	DYNAMIC_TEXT_BOX = 'dynamic_text_box',
	DROPDOWN = 'dropdown',
	CHECKBOX_GROUP = 'checkbox_group',
	PASSWORD = 'password',
	CHECKBOX = 'checkbox',
	RADIO_BUTTON_GROUP = 'radio_button_group',
}

export enum DELIVERY_METHOD {
	COD = 'cod',
	OFFLINE = 'offline',
}

export enum PAYMENT_METHOD {
	CASH = 'CASH',
	VNPAY = 'VNPAY',
}

export enum PAYMENT_TYPE {
	TRANSFER = 'TRANSFER',
	CASH = 'CASH',
}

export enum ORDER_TYPE {
	ONLINE_STORE = 'ONLINE_STORE',
	OFFLINE_STORE = 'OFFLINE_STORE',
}

export enum ORDER_STATUS {
	PROCESSING = 'PROCESSING',
	CONFIRMED = 'CONFIRMED',
	DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RECEIVED = 'RECEIVED',
	CANCELED = 'CANCELED',
}

export type PAYMENT_METHOD_TYPE = 'CASH' | 'VNPAY';
