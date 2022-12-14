import {
	AfterContentChecked,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AccountsService } from './_services/accounts.service';
import { Subscriber } from 'rxjs';
import { UiHelper } from 'src/app/_helpers/ui.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import { loadCartFromLocalStorage } from 'src/app/pages/cart/store/cart/cart.action';
import { Router } from '@angular/router';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent
	implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked
{
	subscription = new Subscriber();

	title = 'happy-care-pharmacy';
	isAppLoading: boolean;
	isAppReloaded: boolean = false;
	settings: Settings;

	constructor(
		public appSettings: AppSettings,
		public accountsService: AccountsService,
		public commonService: CommonService,
		private store: Store<AppState>,
		private router: Router,
		private cd: ChangeDetectorRef,
	) {
		this.settings = this.appSettings.settings;
	}

	async ngOnInit() {
		this.accountsService.refreshToken();
		await this.initAppData();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	ngAfterViewInit() {
		this.cd.detectChanges();
	}

	ngAfterContentChecked() {
		this.subscribeBlockUi();
	}

	subscribeBlockUi() {
		this.subscription.add(
			UiHelper.subscribeBlockUI(isBlock => {
				this.isAppLoading = isBlock;
			}),
		);
	}

	async initAppData() {
		if (this.isAppReloaded) return;

		this.store.dispatch(loadCartFromLocalStorage());
		const [cities, districts] = await Promise.all([
			this.commonService.getListCities(),
			this.commonService.getListDistrict(),
		]);

		LocalStorageHelper.setCommonMetadata(cities, districts);
	}
}
