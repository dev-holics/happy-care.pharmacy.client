import { faker } from '@faker-js/faker';
import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { DEFAULT_PAGINATION, PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ImageHelper } from 'src/app/_helpers/image.helper';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-product-bestseller',
	templateUrl: './product-bestseller.component.html',
	styleUrls: ['./product-bestseller.component.scss'],
})
export class ProductBestsellerComponent implements OnInit, OnChanges {
	@Input() listType: string;
	@Input() categoryId: string;

  selectedOrderIndex: number;

  // pagination
  totalData: number;
  params: any = {
    page: DEFAULT_PAGINATION.PAGE,
    limit: 12,
  };

	highlightTitle: string;

	products: ProductModel[] = [];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
    private toast: MessageService,
	) {}

	ngOnInit() {
		if (!this.listType) {
			this.listType = 'grid';
		}
		this.highlightTitle = 'Bán chạy nhất';
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes.listType) {
			this.listType = changes.listType.currentValue;
		}

		if (changes.categoryId) {
			this.categoryId = changes.categoryId.currentValue;
		}

		await this.getProducts();
	}

  async paginate(event: any) {
    this.params = {
      ...this.params,
      page: event.page + 1,
    };

    return this.getProducts();
  }

	async getProducts() {
		if (this.categoryId) {
			this.params = {
				...this.params,
        sortOption: PRODUCT_FILTER_TYPES.BEST_SELLER,
				categoryId: this.categoryId,
			};
		}

		const products = await this.productService.getProducts(this.params);

    if (!products.success) {
      return this.toast.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Không thể lấy thông tin nhận hàng',
      });
    }

		const newProducts: ProductModel[] = [];

    if (products.data) {
      products.data.forEach((p:any) => {
        const imageUrls = ImageHelper.getListUrlFromImages(p.images);

        newProducts.push({
          id: p.id,
          code: p.code,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          packingSpec: p.packingSpec,
          discount: p.discount || 0,
          imageUrl: imageUrls ? imageUrls[0] : '' || faker.image.nature(),
        });
      });
    }


		this.products = [...newProducts];
    this.totalData = products.totalData;
		this.cd.detectChanges();
	}
}
