import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { Store } from '@ngrx/store';
import * as AppReducer from 'src/app/_store/app.reducer';

@Injectable()
export class CartEffect {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private categoryService: CategoryService,
		private store: Store<AppReducer.AppState>,
	) {}
}
