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
import { PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';

@Component({
	selector: 'app-product-bestseller',
	templateUrl: './product-bestseller.component.html',
	styleUrls: ['./product-bestseller.component.scss'],
})
export class ProductBestsellerComponent implements OnInit, OnChanges {
	@Input() listType: string;
	@Input() categoryId: string;

	highlightTitle: string;

	products: ProductModel[] = [];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
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

	async getProducts() {
		let query: any = {
			page: 1,
			limit: 15,
			sortOption: PRODUCT_FILTER_TYPES.BEST_SELLER,
		};

		if (this.categoryId) {
			query = {
				...query,
				categoryId: this.categoryId,
			};
		}

		const products = await this.productService.getProducts(query);

		const newProducts: ProductModel[] = [];
		products.forEach(p => {
			newProducts.push({
				id: p.id,
				code: p.code,
				name: p.name,
				description: p.description,
				price: p.price,
				category: p.category,
				imageUrl: faker.image.nature(),
			});
		});

		this.products = [...newProducts];
		this.cd.detectChanges();
	}
}
