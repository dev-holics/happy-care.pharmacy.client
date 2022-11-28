import { random } from 'radash';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { CategoryModel } from 'src/app/pages/category/models/category.model';

@Component({
	selector: 'app-category-highlight',
	templateUrl: './category-highlight.component.html',
	styleUrls: ['./category-highlight.component.scss'],
})
export class CategoryHighlightComponent implements OnInit {
	highlightTitle: string;
	categories: CategoryModel[];

	mockImages: string[] = [
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png',
		'https://nhathuoclongchau.com/images/category/20220624120650-9722.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ho-tro-tieu-hoa.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/than-kinh-nao.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png',
		'https://nhathuoclongchau.com/images/category/20220624120646-2097.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ve-sinh-ca-nhan.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cham-soc-rang-mieng.png',
		'https://images.fpt.shop/unsafe/fit-in/200x200/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cham-soc-toc-da-dau.png',
	];

	constructor(private categoryService: CategoryService) {}

	async ngOnInit() {
		this.highlightTitle = 'Danh mục nổi bật';
		this.categories = [];
		await this.getHighlightCategories();
	}

	async getHighlightCategories() {
		const categories = await this.categoryService.getHighlightCategories();

		categories.forEach(cate => {
			// if (cate.countProducts && cate.countProducts > 0) {
			this.categories.push({
				id: cate.id,
				name: cate.name,
				slug: cate.slug,
				imageUrl:
					cate?.imageUrl ||
					this.mockImages[random(0, this.mockImages.length - 1)],
				countProducts: cate.countProducts,
			});
			// }
		});
	}
}
