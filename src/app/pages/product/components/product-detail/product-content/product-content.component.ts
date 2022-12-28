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
import {ImageModel} from "src/app/shared/models/image.model";
import { ProductService } from '../../../services/product.service';
import { BranchModel } from 'src/app/shared/models/branch.model';
import { Router } from '@angular/router';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

@Component({
	selector: 'app-product-content',
	templateUrl: './product-content.component.html',
	styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnInit, OnChanges {
	@Input() product: ProductModel;
  @Input() currentBranch: BranchModel;

	productImages: any[];
	currentImage: any;

	quantity: number = 1;
  maxQuantity: number;
  isWarningAuthenticationVisible: boolean = false;

	constructor(
    private store: Store<AppState>,
    private toast: MessageService,
    private productService: ProductService,
    public router: Router,) {}

	ngOnInit(): void {
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes?.product?.currentValue) {
			this.product = changes.product.currentValue;
      this.getProductImages(this.product.images as ImageModel[]);
		}
    if (changes?.currentBranch?.currentValue) {
      this.currentBranch = changes.currentBranch.currentValue;
    }

    const response = await this.productService.getProductDetailById(this.product.id, this.currentBranch.id);
    this.maxQuantity = response?.data?.quantity ?? 0;
    if (this.maxQuantity == 0 ) {
      this.quantity = 0;
    }
    else {
      this.quantity = 1;
    }
	}

	getProductImages(productImages: ImageModel[]) {
    if (!productImages) return [];

    this.productImages = productImages.map((image: ImageModel) => ({
      id: image.id,
      url: image.url,
      alt: '',
    }));

    if (this.productImages.length > 0) {
      this.currentImage = this.productImages[0];
    }

    return;

		// this.productImages = [
		// 	{
		// 		id: '1',
		// 		imgUrl:
		// 			'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_1.jpg',
		// 		alt: '',
		// 	},
		// 	{
		// 		id: '2',
		// 		imgUrl:
		// 			'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_3.jpg',
		// 		alt: '',
		// 	},
		// 	{
		// 		id: '3',
		// 		imgUrl:
		// 			'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_2.jpg',
		// 		alt: '',
		// 	},
		// ];
	}

	changeProductImage(productId: string) {
		this.currentImage = this.productImages.find(p => p.id === productId);
	}

	onAddToCart(event: any) {
    if (this.quantity < 1) {
      return;
    }
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

  hideWarningAuthentication() {
    this.isWarningAuthenticationVisible = false;
  }

  goToOrderPage(event: any) {
		if (!LocalStorageHelper.getCurrentUser()) {
			this.isWarningAuthenticationVisible = true;
			return;
		}
    this.onAddToCart(event);
		return this.router.navigate(['/gio-hang/thanh-toan']);
	}

  goLoginPage() {
		return this.router.navigate(['/auth/login']);
	}
}
