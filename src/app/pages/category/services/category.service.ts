import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';
import { CategoryModel } from 'src/app/pages/category/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
	constructor(private httpService: HttpService) {}

	async getCategoryTree(): Promise<CategoryModel[]> {
		const url = `${URL_CONFIG.CATEGORY_PUBLIC_URL}/tree`;
		const res = await this.httpService.get(url);

		return res?.data;
	}

	async getCategoryTreeByParentId(parentId: string) {
		const query = this.httpService.convertQueryString({
			parentId,
		});
		const url = `${URL_CONFIG.CATEGORY_PUBLIC_URL}/tree${query}`;

		const res = await this.httpService.get(url);

		return res?.data?.children;
	}

	async getHighlightCategories(): Promise<CategoryModel[]> {
		const url = `${URL_CONFIG.CATEGORY_PUBLIC_URL}/parent`;
		const res = await this.httpService.get(url);

		return res?.data;
	}
}
