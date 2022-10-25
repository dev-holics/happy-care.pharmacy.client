import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-category-highlight',
	templateUrl: './category-highlight.component.html',
	styleUrls: ['./category-highlight.component.scss'],
})
export class CategoryHighlightComponent implements OnInit {
	highlightTitle: string;
	categories: {
		imageUrl: string;
		name: string;
		productQuantity: number;
	}[];

	ngOnInit() {
		this.highlightTitle = 'Danh mục nổi bật';
		this.getProducts();
	}

	getProducts() {
		this.categories = [
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png',
				name: 'Sinh lý - Nội tiết tố',
				productQuantity: 65,
			},
			{
				imageUrl:
					'https://nhathuoclongchau.com/images/category/20220624120650-9722.png',
				name: 'Sức khoẻ tim mạch',
				productQuantity: 42,
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ho-tro-tieu-hoa.png',
				name: 'Hỗ trợ tiêu hoá',
				productQuantity: 86,
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/than-kinh-nao.png',
				name: 'Thần kinh não',
				productQuantity: 71,
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png',
				name: 'Cải thiện tăng cường chức năng',
				productQuantity: 149,
			},
			{
				imageUrl:
					'https://nhathuoclongchau.com/images/category/20220624120646-2097.png',
				name: 'Chăm sóc cá nhân',
				productQuantity: 151,
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png',
				name: 'Chăm sóc da mặt',
				productQuantity: 151,
			},
			{
				imageUrl:
					'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png',
				name: 'Chăm sóc tóc - da đầu',
				productQuantity: 33,
			},
		];
	}
}
