import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AppReducer from 'src/app/_store/app.reducer';
import * as CategoryAction from 'src/app/pages/category/store/category.action';
import { CategoryService } from 'src/app/pages/category/services/category.service';

@Injectable()
export class CategoryEffect {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private categoryService: CategoryService,
		private store: Store<AppReducer.AppState>,
	) {}

	getCategories = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryAction.getCategories),
			switchMap(() => {
				return this.categoryService.getCategoryTree();
			}),
			map(categories => {
				return CategoryAction.setCategories({
					categories,
				});
			}),
		),
	);
}
