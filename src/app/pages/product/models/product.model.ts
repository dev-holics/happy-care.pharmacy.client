import { CategoryModel } from 'src/app/pages/category/models/category.model';
import { TrademarkModel } from 'src/app/_models/trademark.model';
import { OriginModel } from 'src/app/_models/origin.model';

export interface ProductModel {
	id: string;
	code: string;
	name: string;
	description?: string;
	packingSpec?: string;
	price: 40000;
	element?: string;
	uses?: string;
	subject?: string;
	guide?: string;
	preserve?: string;
	imageUrl?: string;
	category: CategoryModel;
	trademark?: TrademarkModel;
	origin?: OriginModel;
}