export const LOCAL_STORAGE_KEY = Object.freeze({
	CURRENT_USER: 'currentUser',
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
	USER_NAME: 'username',
	FULL_NAME: 'fullname',
	CART_STATE: 'cartState',
	CITY: 'CITY',
	DISTRICT: 'DISTRICT',
});

export const HTTP_OPTIONS = Object.freeze({
	Timeout: 5000,
});

export const EVENT_KEY = Object.freeze({
	LOGOUT: 'logout',
});

export const DATA_MESSAGE = Object.freeze({
	NO_DATA: 'Không có dữ liệu',
});

export const DEFAULT_PAGINATION = Object.freeze({
	PAGE: 1,
	LIMIT: 15,
});

export const FREE_DELIVERY_THRESHOLD = 250000;

export const DELIVERY_FEE = 25000;
