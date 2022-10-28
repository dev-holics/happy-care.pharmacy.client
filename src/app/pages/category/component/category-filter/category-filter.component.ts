import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-category-filter',
	templateUrl: './category-filter.component.html',
	styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {
	categoryItems: any[];

	ngOnInit() {
		this.getCategoryItems();
	}

	getCategoryItems() {
		this.categoryItems = [
			{
				id: '1',
				name: 'Sinh lý - Nội tiết tố',
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png',
				subCategories: [
					{
						id: '1_1',
						name: 'Sinh ly nu',
						imageUrl:
							'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-nu.png',
					},
					{
						id: '1_2',
						name: 'Sinh ly nam',
						imageUrl:
							'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-nam.png',
					},
				],
			},
			{
				id: '2',
				name: 'Sức khoẻ tim mạch',
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/images/category/20220624120650-9722.png',
				subCategories: [
					{
						id: '2_1',
						name: 'Suy giảm tĩnh mạch',
						imageUrl:
							'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/tinh-mach.png',
					},
					{
						id: '2_2',
						name: 'Huyết áp',
						imageUrl:
							'https://images.fpt.shop/unsafe/fit-in/80x80/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/huyet-ap.png',
					},
				],
			},
		];
	}
}
