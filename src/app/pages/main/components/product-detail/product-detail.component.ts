import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	subscribe: Subscriber<any> = new Subscriber<any>();

	ngOnInit() {}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}
}
