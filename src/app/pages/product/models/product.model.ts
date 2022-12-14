import { CategoryModel } from 'src/app/pages/category/models/category.model';
import { TrademarkModel } from 'src/app/shared/models/trademark.model';
import { OriginModel } from 'src/app/shared/models/origin.model';
import { ImageModel } from 'src/app/shared/models/image.model';

export interface ProductModel {
	id: string;
	code: string;
	name: string;
	description?: string;
	packingSpec?: string;
	price: number;
	element?: string;
	uses?: string;
	subject?: string;
	guide?: string;
	preserve?: string;
	imageUrl?: string;
	discount: number;
	images?: ImageModel[];
	category: CategoryModel;
	trademark?: TrademarkModel;
	origin?: OriginModel;
  quantity?: number;
}
