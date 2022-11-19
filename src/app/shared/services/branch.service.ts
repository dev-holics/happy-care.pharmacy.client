import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config';
import { BranchModel } from 'src/app/shared/models/branch.model';

@Injectable({ providedIn: 'root' })
export class BranchService {
	constructor(private httpService: HttpService) {}

	async getListBranch(params: any): Promise<BranchModel[]> {
		const queryString = this.httpService.convertQueryString(params);

		const url = `${URL_CONFIG.BRANCH_PUBLIC_URL}/list${queryString}`;
		const res = await this.httpService.get(url);
		const branchData = res?.data || [];

		return branchData.map((branch: any) => ({
			id: branch.id,
			address: branch.address,
			isActive: branch.isActive,
			district: branch.district,
		}));
	}
}
