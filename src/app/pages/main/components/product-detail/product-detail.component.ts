import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ProductService } from 'src/app/pages/product/services/product.service';
import { DATA_MESSAGE } from 'src/app/_config';
import { ImageHelper } from 'src/app/_helpers/image.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import { BranchModel } from 'src/app/shared/models/branch.model';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	categoryId: string;
	categoryName: string;
	product: ProductModel;
	currentBranch: BranchModel;

	constructor(
		private productService: ProductService,
		private store: Store<AppState>,
		private toast: MessageService,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.subscribeBranchChange();
		this.initProductDetail();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initProductDetail() {
		this.subscription.add(
			this.route.params
				.pipe(map(param => param?.productId))
				.subscribe(async productId => {
					await this.getProductDetail(productId);
				}),
		);
	}

	subscribeBranchChange() {
		this.subscription.add(
			this.store.select('share').subscribe(shareData => {
				if (shareData.currentBranch) {
					this.currentBranch = shareData.currentBranch;
				}
			}),
		);
	}
	async getProductDetail(productId: string) {
		if (!productId) return;

		const result = await this.productService.getProductDetailById(
			productId,
			this.currentBranch?.id,
		);

		if (!result.success) {
			return this.toast.add({
				severity: 'error',
				summary: 'Thông báo',
				detail: 'Không lấy được thông tin sản phẩm này',
			});
		}

		const product = result.data;

		if (!product) return;

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
