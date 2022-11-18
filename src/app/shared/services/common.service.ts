import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';
import { CityModel } from 'src/app/_models/city.model';
import { DistrictModel } from 'src/app/_models/district.model';

@Injectable({ providedIn: 'root' })
export class CommonService {
	constructor(private httpService: HttpService) {}

	async getListCities(): Promise<CityModel[]> {
		const url = `${URL_CONFIG.CITY_PUBLIC_URL}`;
		const res = await this.httpService.get(url);
		const cityData = res?.data || [];

		return cityData.map((city: CityModel) => ({
			id: city.id,
			name: city.name,
			isActive: city.isActive,
		}));
	}

	async getListDistrict(): Promise<DistrictModel[]> {
		const url = `${URL_CONFIG.DISTRICT_PUBLIC_URL}`;
		const res = await this.httpService.get(url);
		const districtData = res?.data || [];

		return districtData.map((district: any) => ({
			id: district.id,
			name: district.name,
			isActive: district.isActive,
			cityId: district.city?.id || '',
			city: district.city,
		}));
	}
}
