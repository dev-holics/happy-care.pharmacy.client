import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import { PRODUCT_FILTER_TYPES } from 'src/app/_config';
import { ProductModel } from 'src/app/pages/product/models/product.model';
import { ProductService } from 'src/app/pages/product/services/product.service';

@Component({
	selector: 'app-product-highlight',
	templateUrl: './product-highlight.component.html',
	styleUrls: ['./product-highlight.component.scss'],
})
export class ProductHighlightComponent implements OnInit, OnChanges {
	@Input() categoryId: string;

	filterTypes = PRODUCT_FILTER_TYPES;
	currentFilterType: string;

	highlightTitle: string;
	products: ProductModel[];

	constructor(
		private productService: ProductService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.highlightTitle = 'Sản Phẩm Nổi bật';
	}

	async ngOnChanges(changes: SimpleChanges) {
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

		// this.products = [
		// 	{
		// 		imageUrl:
		// 			'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg',
		// 		name: 'Viên uống A',
		// 		description:
		// 			'Some description Some descriptionSome descriptionSome descriptionSome descriptionSome description',
		// 		price: '120,000đ',
		// 	},
		// 	{
		// 		imageUrl:
		// 			'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/06/00028876-vien-sui-khong-duong-immune-60mg-tuyp-20-vien-2855-62ae_large.jpg',
		// 		name: 'Viên uống B',
		// 		description: 'Some description',
		// 		price: '120,000đ',
		// 	},
		// 	{
		// 		imageUrl:
		// 			'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/06/00031901-vien-uong-bo-sung-vitamin-c-natures-bounty-time-released-c-500mg-100v-6031-62ae_large.jpg',
		// 		name: 'Viên uống C',
		// 		description: 'Some description',
		// 		price: '120,000đ',
		// 	},
		// 	{
		// 		imageUrl:
		// 			'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/04/00028812-nuoc-dong-trung-ha-thao-hector-sam-10-chai-x-50ml-7932-6268_large.jpg',
		// 		name: 'Viên uống D',
		// 		description: 'Some description',
		// 		price: '120,000đ',
		// 	},
		// 	{
		// 		imageUrl:
		// 			'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2017/10/00009732-neilmed-pediatric-starter-kit-30-3182-d459_large.jpg',
		// 		name: 'Viên uống E',
		// 		description: 'Some description',
		// 		price: '120,000đ',
		// 	},
		// ];
	}

	onSelectFilter(filterType: string) {
		switch (filterType) {
			case PRODUCT_FILTER_TYPES.BEST_SELLER:
				this.currentFilterType = PRODUCT_FILTER_TYPES.BEST_SELLER;
				break;
			case PRODUCT_FILTER_TYPES.NEWEST:
				this.currentFilterType = PRODUCT_FILTER_TYPES.NEWEST;
				break;
			case PRODUCT_FILTER_TYPES.ASCENDING_PRICE:
				this.currentFilterType = PRODUCT_FILTER_TYPES.ASCENDING_PRICE;
				break;
			case PRODUCT_FILTER_TYPES.DESCENDING_PRICE:
				this.currentFilterType = PRODUCT_FILTER_TYPES.DESCENDING_PRICE;
				break;
			default:
				break;
		}

		console.log(this.currentFilterType);
	}
}
