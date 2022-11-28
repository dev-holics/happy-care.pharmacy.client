import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import { addToCart } from 'src/app/pages/cart/store/cart/cart.action';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-product-content',
	templateUrl: './product-content.component.html',
	styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnInit, OnChanges {
	@Input() product: ProductModel;

	productImages: any[];
	currentImage: any;

	quantity: number = 1;

	constructor(private store: Store<AppState>, private toast: MessageService) {}

	ngOnInit(): void {
		this.getProductImages();
		this.currentImage = this.productImages[0];
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes?.product?.currentValue) {
			this.product = changes.product.currentValue;
		}
	}

	getProductImages() {
		this.productImages = [
			{
				id: '1',
				imgUrl:
					'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_1.jpg',
				alt: '',
			},
			{
				id: '2',
				imgUrl:
					'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_3.jpg',
				alt: '',
			},
			{
				id: '3',
				imgUrl:
					'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_2.jpg',
				alt: '',
			},
		];
	}

	changeProductImage(productId: string) {
		this.currentImage = this.productImages.find(p => p.id === productId);
	}

	onAddToCart(event: any) {
		this.store.dispatch(
			addToCart({
				product: this.product,
				quantity: this.quantity,
			}),
		);
		this.toast.add({
			severity: 'info',
			summary: 'Thông báo',
			detail: 'Vừa có sản phẩm mới được thêm vào giỏ hàng',
		});
	}
}
