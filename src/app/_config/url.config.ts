import { API_URL } from 'src/app/_config/env.config';

export const URL_CONFIG = Object.freeze({
	USER_URL: `${API_URL}/users`,
	CART_URL: `${API_URL}/carts`,
	USER_SETTING_URL: `${API_URL}/user-settings`,
	ORDER_URL: `${API_URL}/orders`,

	// public
	USER_PUBLICT_URL: `${API_URL}/public/users`,
	CATEGORY_PUBLIC_URL: `${API_URL}/public/categories`,
	PRODUCT_PUBLIC_URL: `${API_URL}/public/products`,
	CITY_PUBLIC_URL: `${API_URL}/public/cities`,
	DISTRICT_PUBLIC_URL: `${API_URL}/public/districts`,
	BRANCH_PUBLIC_URL: `${API_URL}/public/branches`,
});
