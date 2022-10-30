import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';

@Injectable({ providedIn: 'root' })
export class CategoryService {
	constructor(private httpService: HttpService) {}

	getCategories() {
		const url = URL_CONFIG.CATEGORY_PUBLIC_URL;
		return this.httpService.get(url);
	}
}
