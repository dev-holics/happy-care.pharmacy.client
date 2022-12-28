import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public commonService: CommonService,) {
  }

	async ngOnInit(
  ): Promise<void> {
    await this.initCommonData();
  }

  async initCommonData() {
		const [cities, districts] = await Promise.all([
			this.commonService.getListCities(),
			this.commonService.getListDistrict(),
		]);

		LocalStorageHelper.setCommonMetadata(cities, districts);
	}
}
