import { LOCAL_STORAGE_KEY } from 'src/app/_config';
import * as CartReducer from 'src/app/pages/cart/store/cart.reducer';

export class LocalStorageHelper {
	private static get(key: string) {
		return JSON.parse(String(localStorage.getItem(key)));
	}

	private static set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	public static remove(key: string) {
		return localStorage.removeItem(key);
	}

	public static removeAll() {
		localStorage.clear();
	}

	public static init(userAuth: any) {
		if (!userAuth) return;

		this.setAccessToken(userAuth.accessToken);
		this.setRefreshToken(userAuth.refreshToken);
	}

	public static setCurrentUser(currentUser: any) {
		this.set(LOCAL_STORAGE_KEY.CURRENT_USER, currentUser);
	}

	public static getCurrentUser() {
		return this.get(LOCAL_STORAGE_KEY.CURRENT_USER);
	}

	public static removeCurrentUser() {
		return this.remove(LOCAL_STORAGE_KEY.CURRENT_USER);
	}

	public static setUsername(username: string) {
		this.set(LOCAL_STORAGE_KEY.USER_NAME, username);
	}

	public static getUsername() {
		return this.get(LOCAL_STORAGE_KEY.USER_NAME);
	}

	public static setUserFullName(name: string) {
		this.set(LOCAL_STORAGE_KEY.FULL_NAME, name);
	}

	public static getUserFullName() {
		return this.get(LOCAL_STORAGE_KEY.FULL_NAME);
	}

	public static setAccessToken(accessToken: string) {
		return this.set(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
	}

	public static getAccessToken() {
		return this.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
	}

	public static setRefreshToken(refreshToken: string) {
		return this.set(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
	}

	public static getRefreshToken() {
		return this.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
	}

	public static setCartState(cartState: CartReducer.State) {
		return this.set(LOCAL_STORAGE_KEY.CART_STATE, cartState);
	}

	public static getCartState() {
		return this.get(LOCAL_STORAGE_KEY.CART_STATE);
	}

	public static removeCartState() {
		return this.remove(LOCAL_STORAGE_KEY.CART_STATE);
	}
}
