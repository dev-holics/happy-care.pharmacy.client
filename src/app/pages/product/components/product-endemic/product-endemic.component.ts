import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { ImageHelper } from 'src/app/_helpers/image.helper';
import { ProductModel } from '../../models/product.model';

@Component({
	selector: 'app-product-endemic',
	templateUrl: './product-endemic.component.html',
	styleUrls: ['./product-endemic.component.scss'],
})
export class ProductEndemicComponent implements OnInit {
	highlightTitle: string;
	products: ProductModel[];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
		private router: Router,
	) {}

	ngOnInit() {
		this.highlightTitle = 'Sản Phẩm Tăng Sức Đề Kháng';
		this.getProducts();
	}

	async getProducts() {
		const query: any = {
			page: 1,
			limit: 10,
			sortOption: PRODUCT_FILTER_TYPES.NEWEST,
		};

		const products = await this.productService.getProducts(query);

		const newProducts: ProductModel[] = [];

		products.data?.forEach(p => {
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

		this.products = [...newProducts];
		this.cd.detectChanges();
	}
}
