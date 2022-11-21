import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import {
	BasicResponseModel,
	ResponseModel,
} from 'src/app/_models/response.model';
import { ProfileModel } from 'src/app/pages/profile/models/profile.model';
import { URL_CONFIG } from 'src/app/_config';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private httpService: HttpService) {}

	async getUserProfile(): Promise<ResponseModel<ProfileModel>> {
		const url = `${URL_CONFIG.USER_URL}/profile`;
		const res = await this.httpService.get(url);

		if (res?.statusCode !== HttpStatusCode.Ok) {
			return {
				data: null,
				success: false,
			};
		}

		const profile: ProfileModel = {
			id: res.data.id,
			fullname: res?.data?.fullname || '',
			phoneNumber: res?.data?.phoneNumber || '',
			email: res?.data?.email || '',
			gender: res?.data?.gender || '',
			birthday: res?.data?.birthday || '',
		};

		return {
			data: profile,
			success: true,
		};
	}
}
