import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
	subscribe: Subscriber<any> = new Subscriber<any>();

	categoryId: string;
	categoryName: string;

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.initCategoryInfo();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	initCategoryInfo() {
		let hasCategoryId = false;

		this.subscribe.add(
			this.route.queryParams.subscribe(query => {
				console.log(query);
				const { categoryId, categoryName } = query;

				if (categoryId && categoryName) {
					hasCategoryId = true;
					this.categoryId = categoryId;
					this.categoryName = categoryName;
				}
			}),
		);

		if (!hasCategoryId) {
			this.subscribe.add(
				this.route.params.subscribe(param => {
					console.log(param);
				}),
			);
		}
	}
}
