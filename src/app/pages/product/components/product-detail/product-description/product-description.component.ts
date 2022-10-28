import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-product-description',
	templateUrl: './product-description.component.html',
	styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
	tabItems: MenuItem[];
	activeTab: MenuItem;

	productDescription: {
		userTarget: string;
		element: string;
		uses: string;
		packingSpec?: string;
		origin?: string;
		trademark?: string;
	};

	relatedProducts: {
		imageUrl: string;
		name: string;
		description: string;
		price: string;
	}[];

	ngOnInit() {
		this.initTab();
		this.activeTab = this.tabItems[0];
		this.getProductDescription();
		this.getRelatedProduct();
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

	getProductDescription() {
		this.productDescription = {
			userTarget:
				'Thực phẩm thích hợp cho người ăn kiêng, người bị bệnh tiểu đường.',
			element:
				'Sorbitol, Erythritol, Sucralose, Acesulfame-K, bột bắp và Chromium Picolinate.',
			uses: 'Dùng để thay thế đường sucrose cho người ăn kiêng, người bị bệnh tiểu đường.',
			packingSpec: 'Hộp 50 gói x 2g',
			origin: 'Việt Nam',
			// trademark: 'Drapharco',
		};
	}

	getRelatedProduct() {
		this.relatedProducts = [
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
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/250x250/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2019/04/00018464-ngam-ho-bach-bo-mom-and-baby-tat-thanh-5x4-7543-5cc1_large.jpg',
				name: 'Viên uống F',
				description: 'Some description',
				price: '120,000đ',
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/250x250/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2020/10/00345332-bang-vien-uong-tang-cuong-sinh-ly-nam-3809-5f7e_large.JPG',
				name: 'Viên uống G',
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
		];
	}

	changeActiveTab(event: any) {
		const selectedTab = this.tabItems.find(t => t.id === event?.item?.id);

		if (selectedTab) {
			this.activeTab = selectedTab;
		}
	}
}
