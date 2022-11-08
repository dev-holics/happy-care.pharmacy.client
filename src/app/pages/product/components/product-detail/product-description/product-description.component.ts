import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { faker } from '@faker-js/faker';
import { ImageHelper } from 'src/app/_helpers/image.helper';

@Component({
	selector: 'app-product-description',
	templateUrl: './product-description.component.html',
	styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit, OnChanges {
	@Input() categoryId: string;
	@Input() product: ProductModel;

	tabItems: MenuItem[];
	activeTab: MenuItem;

	relatedProducts: ProductModel[];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.initTab();
		this.activeTab = this.tabItems[0];
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes?.categoryId?.currentValue) {
			this.categoryId = changes.categoryId.currentValue;
			await this.getRelatedProduct();
		}

		if (changes?.product?.currentValue) {
			this.product = changes.product.currentValue;
		}
	}

	initTab() {
		this.tabItems = [
			{
				label: 'Thông tin sản phẩm',
				id: 'info',
				command: this.changeActiveTab.bind(this),
			},
			{
				label: 'Thương hiệu',
				id: 'trademark',
				command: this.changeActiveTab.bind(this),
			},
		];
	}

	async getRelatedProduct() {
		const query: any = {
			page: 1,
			limit: 15,
			sortOption: PRODUCT_FILTER_TYPES.BEST_SELLER,
			categoryId: this.categoryId,
		};

		const products = await this.productService.getProducts(query);

		const newProducts: ProductModel[] = [];
		products.forEach(p => {
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

		this.relatedProducts = [...newProducts];
		this.cd.detectChanges();
	}

	changeActiveTab(event: any) {
		const selectedTab = this.tabItems.find(t => t.id === event?.item?.id);

		if (selectedTab) {
			this.activeTab = selectedTab;
		}
	}
}
