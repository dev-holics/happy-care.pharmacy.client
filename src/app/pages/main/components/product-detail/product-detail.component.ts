import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	subscribe: Subscriber<any> = new Subscriber<any>();
	categoryId: string;
	categoryName: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.initCategoryInfo();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	initCategoryInfo() {
		this.subscribe.add(
			this.route.queryParams.subscribe(query => {
				const { categoryId, categoryName } = query;

				if (categoryId && categoryName) {
					this.categoryId = categoryId;
					this.categoryName = categoryName;
				}
			}),
		);
	}
}
