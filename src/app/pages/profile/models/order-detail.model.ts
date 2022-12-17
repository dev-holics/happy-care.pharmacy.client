import {ProductModel} from "src/app/pages/product/models/product.model";

export class OrderDetailModel {
  id: string;
  quantity: number;
  productName: string;
  productImageUrl: string;

  constructor(init?: Partial<OrderDetailModel>) {
    Object.assign(this, init);
  }
}
