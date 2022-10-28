import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-content',
	templateUrl: './product-content.component.html',
	styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnInit {
	productImages: any[];
	currentImage: any;

	quantity: number = 1;

	ngOnInit(): void {
		this.getProductImages();
		this.currentImage = this.productImages[0];
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
}
