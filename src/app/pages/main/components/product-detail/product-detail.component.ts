import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { map } from 'rxjs/operators';
import { DATA_MESSAGE } from 'src/app/_config';
import { ImageHelper } from 'src/app/_helpers/image.helper';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	subscribe: Subscriber<any> = new Subscriber<any>();
	categoryId: string;
	categoryName: string;

	product: ProductModel;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.initProductDetail();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	initProductDetail() {
		this.subscribe.add(
			this.route.params
				.pipe(map(param => param?.productId))
				.subscribe(async productId => {
					await this.getProductDetail(productId);
				}),
		);
	}

	async getProductDetail(productId: string) {
		if (!productId) return;

		const product = await this.productService.getProductDetailById(productId);

		if (product.category) {
			this.categoryId = product.category.id;
			this.categoryName = product.category.name;
		}

		const imageUrls = ImageHelper.getListUrlFromImages(product.images);

		this.product = {
			...product,
			id: product.id,
			name: product.name || DATA_MESSAGE.NO_DATA,
			description: product.description || DATA_MESSAGE.NO_DATA,
			price: product.price || 189000,
			element: product.element || DATA_MESSAGE.NO_DATA,
			uses: product.uses || DATA_MESSAGE.NO_DATA,
			subject: product.subject || DATA_MESSAGE.NO_DATA,
			guide: product.guide || DATA_MESSAGE.NO_DATA,
			preserve: product.preserve || DATA_MESSAGE.NO_DATA,
			discount: product.discount || 0,
			images: product.images,
			imageUrl: imageUrls ? imageUrls[0] : '',
		};
	}
}
