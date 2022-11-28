import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/pages/category/models/category.model';

@Component({
	selector: 'app-category-filter',
	templateUrl: './category-filter.component.html',
	styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit, OnChanges {
	@Input() categoryId: string;
	categoryItems: any[];

	constructor(
		private categoryService: CategoryService,
		private router: Router,
	) {}

	ngOnInit() {}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes.categoryId) {
			this.categoryId = changes.categoryId.currentValue;
			await this.getCategoryItems();
		}
	}

	async getCategoryItems() {
		const categories = await this.categoryService.getCategoryTreeByParentId(
			this.categoryId,
		);

		if (categories?.length > 0) {
			this.categoryItems = [];
			this.setCategoryItems(categories);
		}
	}

	setCategoryItems(categories: CategoryModel[]) {
		categories.forEach(cate => {
			this.categoryItems.push({
				id: cate.id,
				name: cate.name,
				slug: cate.slug,
				subCategories: [],
			});
			if (cate.children && cate.children?.length > 0) {
				cate?.children.forEach(child => {
					this.categoryItems[this.categoryItems.length - 1].push({
						id: child.id,
						name: child.name,
						slug: child.slug,
					});
				});
			}
		});
	}
}
