import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { HttpService } from 'src/app/_services/http.service';
import { DEFAULT_PAGINATION, URL_CONFIG } from 'src/app/_config';
import {
	BasicResponseModel,
	ResponseModel,
} from 'src/app/_models/response.model';
import { ReceiverModel } from 'src/app/pages/cart/models';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserSettingService {
	constructor(private httpService: HttpService) {}

	async getUserSettings(): Promise<ResponseModel<ReceiverModel[]>> {
		const params = {
			page: DEFAULT_PAGINATION.PAGE,
			limit: DEFAULT_PAGINATION.LIMIT,
		};

		const queryString = this.httpService.convertQueryString(params);

		const url = `${URL_CONFIG.USER_SETTING_URL}${queryString}`;
		const res = await this.httpService.get(url);

		if (!res.data || res.statusCode !== HttpStatusCode.Ok) {
			return {
				data: [],
				success: false,
			};
		}

		const userSettings: ReceiverModel[] = res.data.map((setting: any) => {
			return {
				id: setting.id,
				name: setting.name || faker.name.fullName(),
				phoneNumber: setting.phoneNumber,
				city: setting?.district?.city?.name || faker.address.cityName(),
				district: setting?.district?.name || faker.address.state(),
				address: setting.address || faker.address.streetAddress(),
			};
		});

		return {
			data: userSettings,
			success: true,
		};
	}

	async addUserSetting(
		userSetting: ReceiverModel,
	): Promise<BasicResponseModel> {
		const url = `${URL_CONFIG.USER_SETTING_URL}`;

		const data = {
			districtId: userSetting.district,
			address: userSetting.address,
			name: userSetting.name,
			phoneNumber: userSetting.phoneNumber,
		};

		const res = await this.httpService.post(url, data);

		return {
			success: res.statusCode === HttpStatusCode.Created,
		};
	}
}
