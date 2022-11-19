export interface CartItemModel {
	id?: string;
	productId: string;
	productName: string;
	price: number;
	quantity: number;
	packingSpec?: string;
	imageUrl?: string;
	discount?: number;
}

export class CartModel {
	items: CartItemModel[];
	totalPrice: number;
	totalQuantity: number;

	constructor(init?: Partial<CartModel>) {
		Object.assign(this, init);
	}
}
