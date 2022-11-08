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
