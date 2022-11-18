import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AppReducer from 'src/app/_store/app.reducer';
import { CartService } from 'src/app/pages/cart/services/cart.service';

@Injectable()
export class CartEffect {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private cartService: CartService,
		private store: Store<AppReducer.AppState>,
	) {}
}
