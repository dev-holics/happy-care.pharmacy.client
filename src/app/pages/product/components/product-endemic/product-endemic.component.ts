import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/pages/product/services/product.service';

@Component({
	selector: 'app-product-endemic',
	templateUrl: './product-endemic.component.html',
	styleUrls: ['./product-endemic.component.scss'],
})
export class ProductEndemicComponent implements OnInit {
	highlightTitle: string;
	products: {
		imageUrl: string;
		name: string;
		description: string;
		price: string;
	}[];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
		private router: Router,
	) {}

	ngOnInit() {
		this.highlightTitle = 'Sản Phẩm Tăng Sức Đề Kháng';
		this.getProducts();
	}

	getProducts() {
		this.products = [
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg',
				name: 'Viên uống A',
				description: 'Some description',
				price: '120,000đ',
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/06/00028876-vien-sui-khong-duong-immune-60mg-tuyp-20-vien-2855-62ae_large.jpg',
				name: 'Viên uống B',
				description: 'Some description',
				price: '120,000đ',
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/06/00031901-vien-uong-bo-sung-vitamin-c-natures-bounty-time-released-c-500mg-100v-6031-62ae_large.jpg',
				name: 'Viên uống C',
				description: 'Some description',
				price: '120,000đ',
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/04/00028812-nuoc-dong-trung-ha-thao-hector-sam-10-chai-x-50ml-7932-6268_large.jpg',
				name: 'Viên uống D',
				description: 'Some description',
				price: '120,000đ',
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2017/10/00009732-neilmed-pediatric-starter-kit-30-3182-d459_large.jpg',
				name: 'Viên uống E',
				description: 'Some description',
				price: '120,000đ',
			},
		];
	}
}
