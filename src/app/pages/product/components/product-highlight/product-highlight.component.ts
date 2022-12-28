import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import { DEFAULT_PAGINATION, PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { ImageHelper } from 'src/app/_helpers/image.helper';

@Component({
	selector: 'app-product-highlight',
	templateUrl: './product-highlight.component.html',
	styleUrls: ['./product-highlight.component.scss'],
})
export class ProductHighlightComponent implements OnInit, OnChanges {
	@Input() categoryId: string;

	filterTypes = PRODUCT_FILTER_TYPES;
	currentFilterType: string;

	highlightTitle: string;
	products: ProductModel[];

  selectedOrderIndex: number;

  // pagination
  totalData: number;
  params: any = {
    page: DEFAULT_PAGINATION.PAGE,
    limit: 12,
  };

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.highlightTitle = 'Sản Phẩm Nổi bật';
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes.categoryId) {
			this.categoryId = changes.categoryId.currentValue;
			await this.getProducts();
		}
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

		const newProducts: ProductModel[] = [];
		products.data?.forEach((p:any) => {
			const imageUrls = ImageHelper.getListUrlFromImages(p.images);

			newProducts.push({
				id: p.id,
				code: p.code,
				name: p.name,
				description: p.description,
				price: p.price || 0,
				category: p.category,
				packingSpec: p.packingSpec,
				discount: p.discount || 0,
				imageUrl: imageUrls ? imageUrls[0] : '' || faker.image.nature(),
			});
		});

		this.products = [...newProducts];
    this.totalData = products.totalData;
		this.cd.detectChanges();
	}

	onSelectFilter(filterType: string) {
		switch (filterType) {
			case PRODUCT_FILTER_TYPES.BEST_SELLER:
				this.currentFilterType = PRODUCT_FILTER_TYPES.BEST_SELLER;
				break;
			case PRODUCT_FILTER_TYPES.NEWEST:
				this.currentFilterType = PRODUCT_FILTER_TYPES.NEWEST;
				break;
			case PRODUCT_FILTER_TYPES.ASCENDING_PRICE:
				this.currentFilterType = PRODUCT_FILTER_TYPES.ASCENDING_PRICE;
				break;
			case PRODUCT_FILTER_TYPES.DESCENDING_PRICE:
				this.currentFilterType = PRODUCT_FILTER_TYPES.DESCENDING_PRICE;
				break;
			default:
				break;
		}
	}
}
