import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AccountsService } from './_services/accounts.service';
import { Subscriber } from 'rxjs';
import { UiHelper } from 'src/app/_helpers/ui.helper';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent
	implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked
{
	subscribe = new Subscriber();

	title = 'happy-care-admin';
	isAppLoading: boolean;
	public settings: Settings;

	constructor(
		public appSettings: AppSettings,
		public accountsService: AccountsService,
		private cd: ChangeDetectorRef,
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit() {
		// this.isAppLoading = false;
		this.accountsService.refreshToken();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	ngAfterViewInit() {
		this.cd.detectChanges();
	}

	ngAfterContentChecked() {
		this.subscribeBlockUi();
		this.cd.detectChanges();
	}

	subscribeBlockUi() {
		this.subscribe.add(
			UiHelper.subscribeBlockUI(isBlock => {
				this.isAppLoading = isBlock;
			}),
		);
	}
}
